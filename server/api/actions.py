from fastapi import Depends, APIRouter, Path, Query
from fastapi.security import OAuth2PasswordBearer
from db.general import *
from db import models
from api import schemas
from typing import List

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/Clients/{id}", tags=["Clients"])
async def get(id: int = Path(..., title="The ID of the client to get", ge=0)) -> schemas.Client:
        Client = Db.session.query(models.Client).filter(models.Client.id == id).first()
        return Client

@router.post("/Clients", tags=["Clients"])
async def post(client: schemas.Client) -> schemas.Client:
    client = models.Client(**client.dict())
    Db.session.add(client)
    Db.session.commit()
    Db.session.refresh(client)
    return client

@router.put("/Clients/{id}", tags=["Clients"])
async def put(id: int, client: schemas.Client) -> schemas.Client:
    Db.session.query(models.Client).filter(models.Client.id == id).update({**client.dict()}, synchronize_session = False)
    Db.session.commit()
    return client

@router.delete("/Clients/{id}", tags=["Clients"])
async def delete(id: int):
    Db.session.query(models.Client).filter(models.Client.id == id).delete()
    Db.session.commit()
    return {"Deleted id": id}

@router.get("/Projects/{id}", tags=["Projects"])
async def get(id: int = Path(..., title="The ID of the project to get", ge=0)) -> schemas.Project:
        Project = Db.session.query(models.Project).filter(models.Project.id == id).all()
        return Project

@router.post("/Projects", tags=["Projects"])
async def post(project: schemas.Project) -> schemas.Project:
    project = models.Project(**project.dict())
    Db.session.add(project)
    Db.session.commit()
    Db.session.refresh(project)
    return project

@router.put("/Projects/{id}", tags=["Projects"])
async def put(id: int, project: schemas.Project) -> schemas.Project:
    Db.session.query(models.Project).filter(models.Project.id == id).update({**project.dict()}, synchronize_session = False)
    Db.session.commit()
    return project

@router.delete("/Projects/{id}", tags=["Projects"])
async def delete(id: int):
    Db.session.query(models.Project).filter(models.Project.id == id).delete()
    Db.session.commit()
    return {"Deleted id": id}


@router.get("/ItemsToOrder/{id}", tags=["Items to order"])
async def get(id: int = Path(..., title="The ID of the item to order to get", ge=0) ) -> schemas.ItemToOrder:
    ItemToOrder = Db.session.query(models.ItemToOrder).filter(models.ItemToOrder.id == id).first()
    return ItemToOrder

@router.post("/ItemsToOrder", tags=["Items to order"])
async def post(ItemToOrder: schemas.ItemToOrder) -> schemas.ItemToOrder:
    itemToOrder = models.ItemToOrder(**ItemToOrder.dict())
    Db.session.add(itemToOrder)
    Db.session.commit()
    return itemToOrder


@router.put("/ItemsToOrder/{id}", tags=["Items to order"])
async def put(id: int, ItemToOrder: schemas.ItemToOrder) -> schemas.ItemToOrder:
    Db.session.query(models.ItemToOrder).filter(models.ItemToOrder.id == id).update({**ItemToOrder.dict()}, synchronize_session = False)
    Db.session.commit()
    return ItemToOrder


@router.delete("/ItemsToOrder/{id}", tags=["Items to order"])
async def delete(id: int):
    Db.session.query(models.ItemToOrder).filter(models.ItemToOrder.id == id).delete()
    Db.session.commit()
    return {"Deleted id": id}


@router.get("/Distributors/{id}", tags=["Distributors"])
async def get(id: int = Path(..., title="The ID of the distributor to get", ge=0)) -> schemas.Distributor:
        Distributor = Db.session.query(models.Distributor).filter(models.Distributor.id == id).all()
        return Distributor

@router.post("/Distributors", tags=["Distributors"])
async def post(distributor: schemas.Distributor) -> schemas.Distributor:
    distributor = models.Distributor(**distributor.dict())
    Db.session.add(distributor)
    Db.session.commit()
    Db.session.refresh(distributor)
    return distributor

@router.put("/Distributors/{id}", tags=["Distributors"])
async def put(id: int, distributor: schemas.Distributor) -> schemas.Distributor:
    Db.session.query(models.Distributor).filter(models.Distributor.id == id).update({**distributor.dict()}, synchronize_session = False)
    Db.session.commit()
    return distributor

@router.delete("/Distributors/{id}", tags=["Distributors"])
async def delete(id: int):
    Db.session.query(models.Distributor).filter(models.Distributor.id == id).delete()
    Db.session.commit()
    return {"Deleted id": id}