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

@router.get("/Offers", tags=["Offers"])
async def get(id: Optional[int] = None, idDistributor: Optional[int] = None, dateAndTime: Optional[str] = None, archived: Optional[bool] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Offer]:
    try:
        parameters = { "id": id, "idDistributor": idDistributor, "dateAndTime": dateAndTime, "archived": archived }
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Offer, attribute) == value for attribute, value in selectedParameters.items()]

        offers = paginate(Db.session.query(models.Offer).options(joinedload(models.Offer.items).joinedload(models.ItemOffer.item).joinedload(models.Item.project))
                                                        .options(joinedload(models.Offer.items).joinedload(models.ItemOffer.item).joinedload(models.Item.user))
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
async def post(offer: schemas.OfferCreate) -> schemas.Offer:
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
async def put(offer: schemas.OfferEdit) -> schemas.OfferEdit:
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