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

@router.get("/Projects", tags=["Projects"])
async def get(id: Optional[int] = None, name: Optional[str] = None, idClient: Optional[int] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Project]:
    try:
        parameters = {"id": id, "name": name, "idClient": idClient}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Project, attribute) == value for attribute, value in selectedParameters.items()]
        Projects = paginate(Db.session.query(models.Project).options(joinedload(models.Project.client)).filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return Projects

@router.post("/Projects", tags=["Projects"])
async def post(project: schemas.ProjectCreate) -> schemas.Project:
    try:
        project = models.Project(**project.dict())
        Db.session.add(project)
        Db.session.commit()
        Db.session.refresh(project)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return project

@router.put("/Projects/{id}", tags=["Projects"])
async def put(id: int, project: schemas.ProjectCreate) -> schemas.Project:
    try:
        Db.session.query(models.Project).filter(models.Project.id == id).update({**project.dict()}, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return project

@router.delete("/Projects/{id}", tags=["Projects"])
async def delete(id: int):
    try:
        Db.session.query(models.Project).filter(models.Project.id == id).delete()
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return {"Deleted id": id}