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

@router.get("/Offers", tags=["Offers"])
async def get(id: Optional[List[int]] = Query(None), idDistributor: Optional[List[int]] = Query(None), idContactPerson: Optional[List[int]] = Query(None), 
                dateAndTimeStart: Optional[str] = None, dateAndTimeEnd: Optional[str] = None, archived: Optional[List[bool]] = Query(None), 
                page: Optional[int] = 1, size: Optional[int] = 50, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> List[schemas.Offer]:
    try:
        filters = []

        if (id): filters.append(models.Offer.id.in_(id))
        if (dateAndTimeStart): filters.append(models.Offer.dateAndTime >= dateAndTimeStart)
        if (dateAndTimeEnd): filters.append(models.Offer.dateAndTime <= dateAndTimeEnd)
        if (idDistributor): filters.append(models.Offer.idDistributor.in_(idDistributor))
        if (idContactPerson): filters.append(models.Offer.idContactPerson.in_(idContactPerson))
        if (archived): filters.append(models.Offer.archived.in_(archived))

        offers = paginate(Db.session.query(models.Offer).options(joinedload(models.Offer.items).joinedload(models.ItemOffer.item).joinedload(models.Item.project))
                                                        .options(joinedload(models.Offer.items).joinedload(models.ItemOffer.item).joinedload(models.Item.user))
                                                        .options(joinedload(models.Offer.items).joinedload(models.ItemOffer.item).joinedload(models.Item.category))
                                                        .options(joinedload(models.Offer.user))
                                                        .options(joinedload(models.Offer.distributor))
                                                        .options(joinedload(models.Offer.contactPerson))
                                                        .filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return offers

@router.post("/Offers", tags=["Offers"])
async def post(offer: schemas.OfferCreate, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> schemas.Offer:
    try:
        offer = models.Offer(**offer.dict())
        offer.dateAndTime = datetime.now().strftime("%Y-%m-%d %H:%M")
        Db.session.add(offer)
        Db.session.commit()
        Db.session.refresh(offer)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return offer

@router.put("/Offers", tags=["Offers"])
async def put(offer: schemas.OfferEdit, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> schemas.OfferEdit:
    try:
        Db.session.query(models.Offer).filter(models.Offer.id == offer.id).update({
            'idUser': offer.idUser,
            'idDistributor': offer.idDistributor,
            'idContactPerson': offer.idContactPerson,
            'archived': offer.archived,
        }, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return offer