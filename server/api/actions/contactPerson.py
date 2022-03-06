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

@router.get("/ContactPerson", tags=["ContactPerson"])
async def get(id: Optional[int] = None, name: Optional[str] = None, phone: Optional[str] = None, email: Optional[str] = None, idDistributor: Optional[int] = None,
                page: Optional[int] = 1, size: Optional[int] = 50, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN, Permission.PURCHASE])) -> List[schemas.ContactPerson]:
    try:
        parameters = {"id": id, "name": name, 'phone': phone, 'email': email, 'idDistributor': idDistributor}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.ContactPerson, attribute) == value for attribute, value in selectedParameters.items()]
        ContactPerson = paginate(Db.session.query(models.ContactPerson).options(joinedload(models.ContactPerson.distributor)).filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return ContactPerson



@router.post("/ContactPerson", tags=["ContactPerson"])
async def post(contactPerson: schemas.ContactPersonCreate, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN])) -> schemas.ContactPersonCreate:
    try:
        contactPerson = models.ContactPerson(**contactPerson.dict())
        Db.session.add(contactPerson)
        Db.session.commit()
        Db.session.refresh(contactPerson)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return contactPerson


@router.put("/ContactPerson", tags=["ContactPerson"])
async def put(contactPerson: schemas.ContactPersonEdit, decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN])) -> schemas.ContactPersonEdit:
    try:
        Db.session.query(models.ContactPerson).filter(models.ContactPerson.id == contactPerson.id).update({
            'name': contactPerson.name,
            'phone': contactPerson.phone,
            'email': contactPerson.email,
            'description': contactPerson.description,
            'idDistributor': contactPerson.idDistributor
        }, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return contactPerson

