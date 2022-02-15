from fastapi import Depends, APIRouter, Path, Query
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import joinedload, joinedload_all
from db.general import *
from db import models
from api import schemas
from typing import List, Optional
from sqlalchemy import and_
from sqlalchemy_pagination import paginate
from datetime import datetime


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/Inquiries", tags=["Inquiries"])
async def get(id: Optional[List[int]] = Query(None), idDistributor: Optional[List[int]] = Query(None), idContactPerson: Optional[List[int]] = Query(None), dateAndTimeStart: Optional[str] = None, dateAndTimeEnd: Optional[str] = None, archived: Optional[List[bool]] = Query(None), page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Inquiry]:
    try:
        filters = []

        if (id): filters.append(models.Inquiry.id.in_(id))
        if (dateAndTimeStart): filters.append(models.Inquiry.dateAndTime >= dateAndTimeStart)
        if (dateAndTimeEnd): filters.append(models.Inquiry.dateAndTime <= dateAndTimeEnd)
        if (idDistributor): filters.append(models.Inquiry.idDistributor.in_(idDistributor))
        if (idContactPerson): filters.append(models.Inquiry.idContactPerson.in_(idContactPerson))
        if (archived): filters.append(models.Inquiry.archived.in_(archived))

        inquiries = paginate(Db.session.query(models.Inquiry).options(joinedload(models.Inquiry.items).joinedload(models.ItemInquiry.item).joinedload(models.Item.project))
                                                .options(joinedload(models.Inquiry.items).joinedload(models.ItemInquiry.item).joinedload(models.Item.user))
                                                .options(joinedload(models.Inquiry.user))
                                                .options(joinedload(models.Inquiry.distributor))
                                                .options(joinedload(models.Inquiry.contactPerson))
                                                .filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return inquiries

@router.post("/Inquiries", tags=["Inquiries"])
async def post(inquiry: schemas.InquiryCreate) -> schemas.Inquiry:
    try:
        inquiry = models.Inquiry(**inquiry.dict())
        inquiry.dateAndTime = datetime.now().strftime("%Y-%m-%d %H:%M")
        Db.session.add(inquiry)
        Db.session.commit()
        Db.session.refresh(inquiry)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return inquiry

@router.put("/Inquiries", tags=["Inquiries"])
async def put(inquiry: schemas.InquiryEdit) -> schemas.InquiryEdit:
    try:
        Db.session.query(models.Inquiry).filter(models.Inquiry.id == inquiry.id).update({
            'idUser': inquiry.idUser,
            'idDistributor': inquiry.idDistributor,
            'idContactPerson': inquiry.idContactPerson,
            'archived': inquiry.archived,
        }, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return inquiry

@router.delete("/Inquiries/{id}", tags=["Inquiries"])
async def delete(id: int):
    try:
        Db.session.query(models.Inquiry).filter(models.Inquiry.id == id).delete()
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return {"Deleted id": id}