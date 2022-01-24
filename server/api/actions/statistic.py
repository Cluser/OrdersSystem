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


@router.get("/StatisticsAllCosts", tags=["Statistics"])
async def getAllCosts():
       orderItems = Db.session.query(models.ItemOrder)

       price = 0
       for orderItem in orderItems:
              price = price + orderItem.price

       return {'name': 'total', 'value': price}


@router.get("/StatisticsAllOrderedItems", tags=["Statistics"])
async def getCostByDistributor():
       orderItems = Db.session.query(models.ItemOrder)

       count = 0
       for orderItem in orderItems:
              count = count + 1

       return {'name': 'total', 'value': count}




@router.get("/StatisticsByUserReq", tags=["Statistics"])
async def getCostByDistributor():
       statistic = []
       users = Db.session.query(models.User)
       for user in users:
              orderItems = Db.session.query(models.ItemOrder).filter(models.ItemOrder.item.has(models.Item.idUser == user.id))
              price = 0
              for orderItem in orderItems:
                     price = price + orderItem.price
              statistic.append({'name': user.name, 'value': price})
       return statistic


@router.get("/StatisticsByUser", tags=["Statistics"])
async def getCostByDistributor():
       statistic = []
       users = Db.session.query(models.User)
       for user in users:
              orderItems = Db.session.query(models.ItemOrder).filter(models.ItemOrder.order.has(models.Order.idUser == user.id))
              price = 0
              for orderItem in orderItems:
                     price = price + orderItem.price
              statistic.append({'name': user.name, 'value': price})
       return statistic



@router.get("/StatisticsByDistributor", tags=["Statistics"])
async def getCostByDistributor():
       statistic = []
       distributors = Db.session.query(models.Distributor)
       for distributor in distributors:
              orderItems = Db.session.query(models.ItemOrder).filter(models.ItemOrder.order.has(models.Order.idDistributor == distributor.id))
              price = 0
              for orderItem in orderItems:
                     price = price + orderItem.price
              statistic.append({'name': distributor.name, 'value': price})
       return statistic



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


@router.get("/StatisticsByProjectCategory", tags=["Statistics"])
async def getCostByProjectCategory(idProject: Optional[int] = None):
       statistic = []

       categories = Db.session.query(models.Category)

       for category in categories:
              price = 0

              orderItems = Db.session.query(models.ItemOrder).filter(and_(models.ItemOrder.item.has(models.Item.idProject == idProject), 
                                                                         (models.ItemOrder.item.has(models.Item.idCategory == category.id))))
              
              for orderItem in orderItems:
                     price = price + orderItem.price

              statistic.append({'name': category.name, 'value': price})

       return statistic
