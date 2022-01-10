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
async def get(id: Optional[int] = None, idDistributor: Optional[int] = None, dateAndTime: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Order]:
    try:
        parameters = { "id": id, "idDistributor": idDistributor, "dateAndTime": dateAndTime }
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Order, attribute) == value for attribute, value in selectedParameters.items()]

        orders = paginate(Db.session.query(models.Order).options(joinedload(models.Order.items).joinedload(models.ItemOrder.item))
                                                        .options(joinedload(models.Order.user))
                                                        .options(joinedload(models.Order.distributor))
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
        order.dateAndTime = datetime.now()
        Db.session.add(order)
        Db.session.commit()
        Db.session.refresh(order)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return order