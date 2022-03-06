from fastapi import Depends, APIRouter
from fastapi.security import OAuth2PasswordBearer
from db.general import *
from db import models
from api import schemas
from api.actions.authentication import Permission, Security, checkPermissions
from typing import List, Optional
from sqlalchemy import and_
from sqlalchemy_pagination import paginate

router = APIRouter()

@router.get("/Categories", tags=["Categories"])
async def get(id: Optional[int] = None, name: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50, 
                decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> List[schemas.Category]:
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
async def post(category: schemas.CategoryCreate, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN])) -> schemas.CategoryCreate:
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

@router.put("/Categories", tags=["Categories"])
async def put(category: schemas.CategoryEdit, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN])) -> schemas.CategoryEdit:
    try:
        Db.session.query(models.Category).filter(models.Category.id == category.id).update({
            'name': category.name
        }, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return category

@router.delete("/Categories/{id}", tags=["Categories"])
async def delete(id: int, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN])):
    try:
        Db.session.query(models.Category).filter(models.Category.id == id).delete()
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return {"Deleted id": id}