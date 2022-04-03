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

@router.post("/OffersItems", tags=["OffersItems"])
async def post(offerItems: List[schemas.OfferItemCreate], decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> schemas.OfferItem:
    try:
        OfferItems = []
        for offerItem in offerItems:
            OfferItems.append(models.ItemOffer(**offerItem.dict()))
        
        Db.session.add_all(OfferItems)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return OfferItems

@router.put("/OffersItems", tags=["OrdersItems"])
async def put(offerItems: List[schemas.OfferItemEdit], decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> List[schemas.OfferItemEdit]:
    try:
        for offerItem in offerItems:
            Db.session.query(models.ItemOffer).filter(models.ItemOffer.id == offerItem.id).update({
                'id': offerItem.id,
                'price': offerItem.price,
                'quantity': offerItem.quantity
            }, synchronize_session = False)
            Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return offerItem
