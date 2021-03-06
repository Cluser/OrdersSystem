from fastapi import Depends, APIRouter, Path, Query
from fastapi.security import OAuth2PasswordBearer
from db.general import *
from db import models
from api import schemas, actions
from api.actions.authentication import Permission, Security, checkPermissions
from typing import List, Optional
from sqlalchemy import and_
from sqlalchemy_pagination import paginate

router = APIRouter()

@router.get("/Users", tags=["Users"])
async def get(id: Optional[int] = None, name: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50,
                decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> List[schemas.User]:
    try:
        parameters = {"id": id, "name": name}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.User, attribute) == value for attribute, value in selectedParameters.items()]
        Users = paginate(Db.session.query(models.User).filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return Users

@router.post("/Users", tags=["Users"])
async def post(user: schemas.UserCreate, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> schemas.UserCreate:
    try:
        User = models.User(**user.dict())
        User.password = actions.getPasswordHash(user.password)
        Db.session.add(User)
        Db.session.commit()
        Db.session.refresh(User)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return "User created"


@router.put("/Users", tags=["Users"])
async def put(user: schemas.UserEdit, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> schemas.UserEdit:
    try:
        Db.session.query(models.User).filter(models.User.id == user.id).update({
            'email': user.email,
            'name': user.name,
            'surname': user.surname,
            'password': actions.getPasswordHash(user.password)
        }, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return user

@router.delete("/Users/{id}", tags=["Users"])
async def delete(id: int, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])):
    try:
        Db.session.query(models.User).filter(models.User.id == id).delete()
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return {"Deleted id": id}