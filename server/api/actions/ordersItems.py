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

