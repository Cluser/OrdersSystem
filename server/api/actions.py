from fastapi import Depends, APIRouter, Path, Query
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import contains_eager
from db.general import *
from db import models
from api import schemas
from typing import List, Optional
from sqlalchemy import and_, or_, not_

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/Clients", tags=["Clients"])
async def get(id: Optional[int] = None, name: Optional[str] = None, address: Optional[str] = None) -> List[schemas.Client]:
        parameters = {"id": id, "name": name, "address": address}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Client, attribute) == value for attribute, value in selectedParameters.items()]
        Clients = Db.session.query(models.Client).filter(and_(*filters)).all()
        return Clients

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

@router.get("/Projects", tags=["Projects"])
async def get(id: Optional[int] = None, name: Optional[str] = None, idClient: Optional[int] = None) -> List[schemas.Project]:
        parameters = {"id": id, "name": name, "idClient": idClient}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Project, attribute) == value for attribute, value in selectedParameters.items()]
        Projects = Db.session.query(models.Project).filter(and_(*filters)).all()
        return Projects

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

@router.get("/ItemsToOrder", tags=["Items to order"])
async def get(id: Optional[int] = None, name: Optional[str] = None, status: Optional[str] = None, quantity: Optional[int] = None, idProject: Optional[int] = None, idDistributor: Optional[int] = None) -> List[schemas.Project]:
        parameters = {"id": id, "name": name, "status": status, 'quantity': quantity, 'idProject': idProject, 'idDistributor': idDistributor}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.ItemToOrder, attribute) == value for attribute, value in selectedParameters.items()]
        ItemsToOrder = Db.session.query(models.ItemToOrder).filter(and_(*filters)).all()
        return ItemsToOrder

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
    

@router.get("/Distributors", tags=["Distributors"])
async def get(id: Optional[int] = None, name: Optional[str] = None, address: Optional[str] = None, phone: Optional[str] = None) -> List[schemas.Distributor]:
        parameters = {"id": id, "name": name, "address": address, 'phone': phone}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Distributor, attribute) == value for attribute, value in selectedParameters.items()]
        Distributors = Db.session.query(models.Distributor).filter(and_(*filters)).all()
        return Distributors

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

@router.get("/Inquiries", tags=["Inquiries"])
async def get(id: Optional[int] = None, idDistributor: Optional[str] = None, dateAndTime: Optional[str] = None) -> List[schemas.Inquiry]:
        parameters = {"id": id, "idDistributor": idDistributor, "dateAndTime": dateAndTime}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Inquiry, attribute) == value for attribute, value in selectedParameters.items()]
        Inquiries = Db.session.query(models.Inquiry).filter(and_(*filters)).all()
        return Inquiries

@router.post("/Inquiries", tags=["Inquiries"])
async def post(inquiry: schemas.Inquiry) -> schemas.Inquiry:
    inquiry = models.Inquiry(**inquiry.dict())
    Db.session.add(inquiry)
    Db.session.commit()
    Db.session.refresh(inquiry)
    return inquiry

@router.put("/Inquiries/{id}", tags=["Inquiries"])
async def put(id: int, inquiry: schemas.Inquiry) -> schemas.Distributor:
    Db.session.query(models.Inquiry).filter(models.Inquiry.id == id).update({**inquiry.dict()}, synchronize_session = False)
    Db.session.commit()
    return inquiry

@router.delete("/Inquiries/{id}", tags=["Inquiries"])
async def delete(id: int):
    Db.session.query(models.Inquiry).filter(models.Inquiry.id == id).delete()
    Db.session.commit()
    return {"Deleted id": id}


@router.get("/Books", tags=["Books"])
async def get():
        Books = Db.session.query(models.Book).join(models.Book.authors).options(contains_eager(models.Book.authors)).populate_existing().all()
        return Books

@router.get("/Authors", tags=["Authors"])
async def get():
        Authors = Db.session.query(models.Author).join(models.Author.books).options(contains_eager(models.Author.books)).populate_existing().all()
        return Authors