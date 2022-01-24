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
async def get(id: Optional[int] = None, idDistributor: Optional[int] = None, idContactPerson: Optional[int] = None, dateAndTime: Optional[str] = None, archived: Optional[bool] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Inquiry]:
    try:
        parameters = { "id": id, "idDistributor": idDistributor, "idContactPerson": idContactPerson, "dateAndTime": dateAndTime, "archived": archived }
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Inquiry, attribute) == value for attribute, value in selectedParameters.items()]

        inquiries = paginate(Db.session.query(models.Inquiry).options(joinedload(models.Inquiry.items).joinedload(models.ItemInquiry.item))
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

@router.put("/Inquiries/{id}", tags=["Inquiries"])
async def put(id: int, inquiry: schemas.Inquiry) -> schemas.Distributor:
    try:
        Db.session.query(models.Inquiry).filter(models.Inquiry.id == id).update({**inquiry.dict()}, synchronize_session = False)
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