from fastapi import Depends, APIRouter, Path, Query
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import joinedload
from db.general import *
from db import models
from api import schemas
from typing import List, Optional
from sqlalchemy import and_
from sqlalchemy_pagination import paginate
from datetime import datetime
from sqlalchemy.dialects.postgresql import Any

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/Items", tags=["Items to order"])
async def get(id: Optional[int] = None, name: Optional[str] = None, model: Optional[str] = None, status: Optional[List[str]] = Query(None), comment: Optional[str] = None, 
                archived: Optional[List[bool]] = Query(None), dateAndTime: Optional[str] = None, quantity: Optional[int] = None, idCategory: Optional[List[int]] = Query(None), idProject: Optional[List[int]] = Query(None), 
                dateAndTimeStart: Optional[str] = None, dateAndTimeEnd: Optional[str] = None,
                page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Item]:
    try:
        parameters = {"id": id, "name": name, "model": model, "comment": comment, 'dateAndTime': dateAndTime, 'quantity': quantity }
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Item, attribute) == value for attribute, value in selectedParameters.items()]

        if (dateAndTimeStart): filters.append(models.Item.dateAndTime >= dateAndTimeStart)
        if (dateAndTimeEnd): filters.append(models.Item.dateAndTime <= dateAndTimeEnd)
        if (idProject): filters.append(models.Item.idProject.in_(idProject))
        if (idCategory): filters.append(models.Item.idCategory.in_(idCategory))
        if (archived): filters.append(models.Item.archived.in_(archived))

        items = paginate(Db.session.query(models.Item).options(joinedload(models.Item.inquiries).joinedload(models.ItemInquiry.inquiry).joinedload(models.Inquiry.user))
                                                    .options(joinedload(models.Item.inquiries).joinedload(models.ItemInquiry.inquiry).joinedload(models.Inquiry.distributor)) 
                                                    .options(joinedload(models.Item.offers).joinedload(models.ItemOffer.offer).joinedload(models.Offer.user))
                                                    .options(joinedload(models.Item.offers).joinedload(models.ItemOffer.offer).joinedload(models.Offer.distributor))
                                                    .options(joinedload(models.Item.orders).joinedload(models.ItemOrder.order).joinedload(models.Order.user))
                                                    .options(joinedload(models.Item.orders).joinedload(models.ItemOrder.order).joinedload(models.Order.distributor))
                                                    .options(joinedload(models.Item.category))
                                                    .options(joinedload(models.Item.user))
                                                    .options(joinedload(models.Item.project))
                                                    .filter(and_(*filters)), page, size)
                                                    
        for item in items.items:
            statusWaitingForOffer = len(item.inquiries) > 0
            statusWaitingForOrder = len(item.offers) > 0
            statusNew = not statusWaitingForOffer and not statusWaitingForOrder

            quantity = 0
            for order in item.orders:
                quantity = quantity + order.quantity

            statusPartialOrder = item.quantity > quantity > 0 
            statusFullOrder = quantity == item.quantity
            statusMoreThanNeededOrder = quantity > item.quantity

            if statusNew: item.status = "Nowy"
            if statusWaitingForOffer: item.status = "Czekanie za ofertą"
            if statusWaitingForOrder: item.status = "Czekanie za zamówieniem"
            if statusPartialOrder: item.status = "Częściowo zamówiono"
            if statusFullOrder: item.status = "Zamówiono"
            if statusMoreThanNeededOrder: item.status = "Zamówiono nadmiarowo"

        if (status): items.items = [item for item in items.items if item.status in status]
        items.total = len(items.items)
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
        Item.dateAndTime = datetime.now().strftime("%Y-%m-%d %H:%M")
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
            'model': Item.model,
            'quantity': Item.quantity,
            'comment': Item.comment,
            'archived': Item.archived,
            'idCategory': Item.idCategory,
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

