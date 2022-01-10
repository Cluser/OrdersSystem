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

@router.post("/InquiriesItems", tags=["InquiriesItems"])
async def post(inquiryItems: List[schemas.InquiryItemCreate]) -> schemas.InquiryItem:
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