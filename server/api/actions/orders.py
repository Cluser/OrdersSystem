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

@router.get("/Orders", tags=["Orders"])
async def get(id: Optional[int] = None, idDistributor: Optional[int] = None, dateAndTimeStart: Optional[str] = None, dateAndTimeEnd: Optional[str] = None, archived: Optional[bool] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Order]:
    try:
        parameters = { "id": id, "idDistributor": idDistributor, "archived": archived }
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Order, attribute) == value for attribute, value in selectedParameters.items()]

        if (dateAndTimeStart): filters.append(models.Order.dateAndTime >= dateAndTimeStart)
        if (dateAndTimeEnd): filters.append(models.Order.dateAndTime <= dateAndTimeEnd)

        orders = paginate(Db.session.query(models.Order).options(joinedload(models.Order.items).joinedload(models.ItemOrder.item).joinedload(models.Item.project))
                                                        .options(joinedload(models.Order.items).joinedload(models.ItemOrder.item).joinedload(models.Item.user))
                                                        .options(joinedload(models.Order.user))
                                                        .options(joinedload(models.Order.distributor))
                                                        .options(joinedload(models.Order.contactPerson))
                                                        .filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return orders

@router.post("/Orders", tags=["Orders"])
async def post(order: schemas.OrderCreate) -> schemas.Order:
    try:
        order = models.Order(**order.dict())
        order.dateAndTime = datetime.now().strftime("%Y-%m-%d %H:%M")
        Db.session.add(order)
        Db.session.commit()
        Db.session.refresh(order)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return order

@router.put("/Orders", tags=["Orders"])
async def put(order: schemas.OrderEdit) -> schemas.OrderEdit:
    try:
        Db.session.query(models.Order).filter(models.Order.id == order.id).update({
            'idUser': order.idUser,
            'idDistributor': order.idDistributor,
            'idContactPerson': order.idContactPerson,
            'archived': order.archived,
        }, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return order