from fastapi import Depends, APIRouter, Path, Query
from fastapi.security import OAuth2PasswordBearer
from db.general import *
from db import models
from api import schemas
from typing import List, Optional
from sqlalchemy import and_
from sqlalchemy_pagination import paginate

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/Categories", tags=["Categories"])
async def get(id: Optional[int] = None, name: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Category]:
    try:
        parameters = {"id": id, "name": name}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Category, attribute) == value for attribute, value in selectedParameters.items()]
        Categories = paginate(Db.session.query(models.Category).filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return Categories

@router.post("/Categories", tags=["Categories"])
async def post(category: schemas.CategoryCreate) -> schemas.CategoryCreate:
    try:
        category = models.Category(**category.dict())
        Db.session.add(category)
        Db.session.commit()
        Db.session.refresh(category)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return category
