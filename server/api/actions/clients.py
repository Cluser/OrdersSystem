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

@router.get("/Clients", tags=["Clients"])
async def get(id: Optional[int] = None, name: Optional[str] = None, address: Optional[str] = None, email: Optional[str] = None, phone: Optional[str] = None, description: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Client]:
        try:
            parameters = {"id": id, "name": name, "address": address, "email": email, "phone": phone, "description": description}
            selectedParameters = {key: value for key, value in parameters.items() if value is not None}
            filters = [getattr(models.Client, attribute) == value for attribute, value in selectedParameters.items()]
            Clients = paginate(Db.session.query(models.Client).filter(and_(*filters)), page, size)
        except:
            Db.session.rollback()
            raise
        finally:
            Db.session.close()
            return Clients

@router.post("/Clients", tags=["Clients"])
async def post(client: schemas.ClientCreate) -> schemas.Client:
    try:
        client = models.Client(**client.dict())
        Db.session.add(client)
        Db.session.commit()
        Db.session.refresh(client)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return client

@router.put("/Clients", tags=["Clients"])
async def put(client: schemas.ClientEdit) -> schemas.ClientEdit:
    try:
        Db.session.query(models.Client).filter(models.Client.id == client.id).update({
            'name': client.name,
            'address': client.address,
            'email': client.email,
            'phone': client.phone,
            'description': client.description
        }, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return client

@router.delete("/Clients", tags=["Clients"])
async def delete(id: int):
    try:
        Db.session.query(models.Client).filter(models.Client.id == id).delete()
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return {"Deleted id": id}