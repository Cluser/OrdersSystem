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

@router.get("/OrdersItems", tags=["OrdersItems"])
async def get(Item_id: Optional[int] = None, order_id: Optional[int] = None, quantity: Optional[int] = None, price: Optional[int] = None, status: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.ItemOrder]:
    try:
        parameters = {"Item_id": Item_id, "order_id": order_id, 'quantity': quantity, 'price': price, 'status': status}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.ItemOrder, attribute) == value for attribute, value in selectedParameters.items()]
        OrdersItems = paginate(Db.session.query(models.ItemOrder).options(joinedload(models.ItemOrder.order))
                                                                 .options(joinedload(models.ItemOrder.item))
                                                                 .filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return OrdersItems

@router.post("/OrdersItems", tags=["OrdersItems"])
async def post(orderItems: List[schemas.OrderItemCreate]):
    try:
        OrderItems = []
        for orderItem in orderItems:
            OrderItems.append(models.ItemOrder(**orderItem.dict()))
        
        Db.session.add_all(OrderItems)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return OrderItems

