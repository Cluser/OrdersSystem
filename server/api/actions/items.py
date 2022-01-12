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

@router.get("/Items", tags=["Items to order"])
async def get(id: Optional[int] = None, name: Optional[str] = None, status: Optional[str] = None, comment: Optional[str] = None,dateAndTime: Optional[str] = None, quantity: Optional[int] = None, idProject: Optional[int] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Item]:
    try:
        parameters = {"id": id, "name": name, "status": status, "comment": comment,'dateAndTime': dateAndTime, 'quantity': quantity, 'idProject': idProject}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Item, attribute) == value for attribute, value in selectedParameters.items()]

        items = paginate(Db.session.query(models.Item).options(joinedload(models.Item.inquiries).joinedload(models.ItemInquiry.inquiry).joinedload(models.Inquiry.user))
                                                    .options(joinedload(models.Item.inquiries).joinedload(models.ItemInquiry.inquiry).joinedload(models.Inquiry.distributor)) 
                                                    .options(joinedload(models.Item.offers).joinedload(models.ItemOffer.offer).joinedload(models.Offer.user))
                                                    .options(joinedload(models.Item.offers).joinedload(models.ItemOffer.offer).joinedload(models.Offer.distributor))
                                                    .options(joinedload(models.Item.orders).joinedload(models.ItemOrder.order).joinedload(models.Order.user))
                                                    .options(joinedload(models.Item.orders).joinedload(models.ItemOrder.order).joinedload(models.Order.distributor))
                                                    .options(joinedload(models.Item.user))
                                                    .options(joinedload(models.Item.project))
                                                    .filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return items


@router.post("/Items", tags=["Items to order"])
async def post(Item: schemas.ItemCreate) -> schemas.Item:
    try:
        Item = models.Item(**Item.dict())
        Item.dateAndTime = datetime.now()
        Db.session.add(Item)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return Item


@router.put("/Items", tags=["Items to order"])
async def put(Item: schemas.ItemEdit) -> schemas.ItemEdit:
    try:
        Db.session.query(models.Item).filter(models.Item.id == Item.id).update({
            'name': Item.name,
            'category': Item.category,
            'quantity': Item.quantity,
            'status': Item.status,
            'comment': Item.comment,
            'idUser': Item.idUser,
            'idProject': Item.idProject
        }, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return Item


@router.delete("/Items/{id}", tags=["Items to order"])
async def delete(id: int):
    try:
        Db.session.query(models.Item).filter(models.Item.id == id).delete()
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return {"Deleted id": id}