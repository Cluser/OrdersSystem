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

@router.post("/InquiriesItems", tags=["InquiriesItems"])
async def post(inquiryItems: List[schemas.InquiryItemCreate], decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> schemas.InquiryItem:
    try:
        InquiryItem = []
        for inquiryItem in inquiryItems:
            InquiryItem.append(models.ItemInquiry(**inquiryItem.dict()))
        
        Db.session.add_all(InquiryItem)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return InquiryItem

@router.put("/InquiriesItems", tags=["InquiriesItems"])
async def put(inquiryItems: List[schemas.InquiryItemEdit], decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> List[schemas.InquiryItemEdit]:
    try:
        for inquiryItem in inquiryItems:
            Db.session.query(models.ItemInquiry).filter(models.ItemInquiry.id == inquiryItem.id).update({
                'id': inquiryItem.id,
                'quantity': inquiryItem.quantity
            }, synchronize_session = False)
            Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return inquiryItem