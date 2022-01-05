from fastapi import Depends, APIRouter, Path, Query
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import joinedload
from db.general import *
from db import models
from api import schemas
from typing import List, Optional
from sqlalchemy import and_
from sqlalchemy_pagination import paginate


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/Clients", tags=["Clients"])
async def get(id: Optional[int] = None, name: Optional[str] = None, address: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Client]:
        parameters = {"id": id, "name": name, "address": address}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Client, attribute) == value for attribute, value in selectedParameters.items()]
        Clients = paginate(Db.session.query(models.Client).filter(and_(*filters)), page, size)
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
async def get(id: Optional[int] = None, name: Optional[str] = None, idClient: Optional[int] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Project]:
        parameters = {"id": id, "name": name, "idClient": idClient}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Project, attribute) == value for attribute, value in selectedParameters.items()]
        Projects = paginate(Db.session.query(models.Project).filter(and_(*filters)), page, size)
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

@router.get("/Items", tags=["Items to order"])
async def get(id: Optional[int] = None, name: Optional[str] = None, status: Optional[str] = None, quantity: Optional[int] = None, idProject: Optional[int] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Item]:
        parameters = {"id": id, "name": name, "status": status, 'quantity': quantity, 'idProject': idProject}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Item, attribute) == value for attribute, value in selectedParameters.items()]

        items = paginate(Db.session.query(models.Item).options(joinedload(models.Item.inquiries)).filter(and_(*filters)), page, size)
        
        Items = []
        for item in items.items:
            Items.append(schemas.Item.from_orm(item))

        return Items


@router.post("/Items", tags=["Items to order"])
async def post(Item: schemas.Item) -> schemas.Item:
    Item = models.Item(**Item.dict())
    Db.session.add(Item)
    Db.session.commit()
    return Item


@router.put("/Items/{id}", tags=["Items to order"])
async def put(id: int, Item: schemas.Item) -> schemas.Item:
    Db.session.query(models.Item).filter(models.Item.id == id).update({**Item.dict()}, synchronize_session = False)
    Db.session.commit()
    return Item


@router.delete("/Items/{id}", tags=["Items to order"])
async def delete(id: int):
    Db.session.query(models.Item).filter(models.Item.id == id).delete()
    Db.session.commit()
    return {"Deleted id": id}
    

@router.get("/Distributors", tags=["Distributors"])
async def get(id: Optional[int] = None, name: Optional[str] = None, address: Optional[str] = None, phone: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Distributor]:
        parameters = {"id": id, "name": name, "address": address, 'phone': phone}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Distributor, attribute) == value for attribute, value in selectedParameters.items()]
        Distributors = paginate(Db.session.query(models.Distributor).filter(and_(*filters)), page, size)
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
async def get(id: Optional[int] = None, idDistributor: Optional[int] = None, dateAndTime: Optional[str] = None, inquiriedBy: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Inquiry]:
        parameters = {"id": id, "idDistributor": idDistributor, "dateAndTime": dateAndTime, "inquiriedBy": dateAndTime}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Inquiry, attribute) == value for attribute, value in selectedParameters.items()]

        inquiries = paginate(Db.session.query(models.Inquiry).options(joinedload(models.Inquiry.items)).filter(and_(*filters)), page, size)
        Inquiries = []
        for inquiry in inquiries.items:
            Inquiries.append(schemas.Inquiry.from_orm(inquiry))

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

@router.get("/Orders", tags=["Orders"])
async def get(id: Optional[int] = None, idDistributor: Optional[int] = None, dateAndTime: Optional[str] = None, orderedBy: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Order]:
        parameters = {"id": id, "idDistributor": idDistributor, "dateAndTime": dateAndTime, "orderedBy": orderedBy}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Order, attribute) == value for attribute, value in selectedParameters.items()]

        orders = paginate(Db.session.query(models.Order).options(joinedload(models.Order.items)).filter(and_(*filters)), page, size)
        # orders = paginate(Db.session.query(models.Order).options(joinedload(models.Order.items), joinedload(models.Order.user), joinedload(models.Order.distributor)).filter(and_(*filters)), page, size)
        Orders = []
        for order in orders.items:
            Orders.append(schemas.Order.from_orm(order))

        return Orders

@router.post("/OrdersItems", tags=["OrdersItems"])
async def post(orderItem: schemas.OrderItem):
    OrderItem = [
        # models.ItemOrder(Item_id = orderItem.Item_id, order_id = orderItem.order_id, quantity = orderItem.quantity, price = orderItem.price, status = orderItem.status),
        models.ItemOrder(Item_id = 1, order_id = 1, quantity = 5, price = 10, status = orderItem.status)
    ]
    Db.session.add_all(OrderItem)
    Db.session.commit()
    return OrderItem


# @router.get("/Books", tags=["Books"])
# async def get():
#         db_book = Db.session.query(models.Book).options(joinedload(models.Book.authors)).where(models.Book.id == 1).one()
#         schema_book = schemas.BookSchema.from_orm(db_book)
#         print(schema_book.json())
#         return schema_book

# @router.get("/Authors", tags=["Authors"])
# async def get():
#         db_author = Db.session.query(models.Author).options(joinedload(models.Author.books)).where(models.Author.id == 1).one()

#         schema_author = schemas.AuthorSchema.from_orm(db_author)
#         print(schema_author.json())
#         return schema_author