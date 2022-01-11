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

@router.get("/Distributors", tags=["Distributors"])
async def get(id: Optional[int] = None, name: Optional[str] = None, address: Optional[str] = None, phone: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Distributor]:
    try:
        parameters = {"id": id, "name": name, "address": address, 'phone': phone}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Distributor, attribute) == value for attribute, value in selectedParameters.items()]
        Distributors = paginate(Db.session.query(models.Distributor).filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return Distributors

@router.post("/Distributors", tags=["Distributors"])
async def post(distributor: schemas.DistributorCreate) -> schemas.Distributor:
    try:
        distributor = models.Distributor(**distributor.dict())
        Db.session.add(distributor)
        Db.session.commit()
        Db.session.refresh(distributor)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return distributor

@router.put("/Distributors/{id}", tags=["Distributors"])
async def put(id: int, distributor: schemas.Distributor) -> schemas.Distributor:
    try:
        Db.session.query(models.Distributor).filter(models.Distributor.id == id).update({**distributor.dict()}, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return distributor

@router.delete("/Distributors/{id}", tags=["Distributors"])
async def delete(id: int):
    try:
        Db.session.query(models.Distributor).filter(models.Distributor.id == id).delete()
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return {"Deleted id": id}