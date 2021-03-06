from fastapi import Depends, APIRouter, Path, Query
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import joinedload, joinedload_all
from db.general import *
from db import models
from api import schemas
from api.actions.authentication import Permission, Security, checkPermissions
from typing import List, Optional
from sqlalchemy import and_
from sqlalchemy_pagination import paginate
from datetime import datetime


router = APIRouter()

@router.get("/OrdersItems", tags=["OrdersItems"])
async def get(Item_id: Optional[int] = None, order_id: Optional[int] = None, quantity: Optional[int] = None, price: Optional[int] = None, 
                page: Optional[int] = 1, size: Optional[int] = 50, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> List[schemas.ItemOrder]:
    try:
        parameters = {"Item_id": Item_id, "order_id": order_id, 'quantity': quantity, 'price': price}
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
async def post(orderItems: List[schemas.OrderItemCreate], decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])):
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

@router.put("/OrdersItems", tags=["OrdersItems"])
async def put(orderItems: List[schemas.OrderItemEdit], decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> List[schemas.OrderItemEdit]:
    try:
        for orderItem in orderItems:
            Db.session.query(models.ItemOrder).filter(models.ItemOrder.id == orderItem.id).update({
                'id': orderItem.id,
                'price': orderItem.price,
                'quantity': orderItem.quantity
            }, synchronize_session = False)
            Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return orderItem