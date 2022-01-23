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

@router.get("/Statistics", tags=["Statistics"])
async def getCostByProject():
       statistic = []
       projects = Db.session.query(models.Project)
       for project in projects:
              orderItems = Db.session.query(models.ItemOrder).filter(models.ItemOrder.item.has(models.Item.idProject == project.id))
              price = 0
              for orderItem in orderItems:
                     price = price + orderItem.price
              statistic.append({'name': project.name, 'value': price})
       return statistic
