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
async def get(id: Optional[int] = None, name: Optional[str] = None, address: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Client]:
        try:
            parameters = {"id": id, "name": name, "address": address}
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

@router.put("/Clients/{id}", tags=["Clients"])
async def put(id: int, client: schemas.ClientCreate) -> schemas.Client:
    try:
        Db.session.query(models.Client).filter(models.Client.id == id).update({**client.dict()}, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return client

@router.delete("/Clients/{id}", tags=["Clients"])
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

@router.get("/Projects", tags=["Projects"])
async def get(id: Optional[int] = None, name: Optional[str] = None, idClient: Optional[int] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Project]:
    try:
        parameters = {"id": id, "name": name, "idClient": idClient}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Project, attribute) == value for attribute, value in selectedParameters.items()]
        Projects = paginate(Db.session.query(models.Project).filter(and_(*filters)), page, size)
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


@router.get("/Items", tags=["Items to order"])
async def get(id: Optional[int] = None, name: Optional[str] = None, status: Optional[str] = None, quantity: Optional[int] = None, idProject: Optional[int] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Item]:
    try:
        parameters = {"id": id, "name": name, "status": status, 'quantity': quantity, 'idProject': idProject}
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Item, attribute) == value for attribute, value in selectedParameters.items()]

        items = paginate(Db.session.query(models.Item).options(joinedload(models.Item.inquiries).joinedload(models.ItemInquiry.inquiry).joinedload(models.Inquiry.user))
                                                    .options(joinedload(models.Item.inquiries).joinedload(models.ItemInquiry.inquiry).joinedload(models.Inquiry.distributor)) 
                                                    .options(joinedload(models.Item.offers).joinedload(models.ItemOffer.offer).joinedload(models.Offer.user))
                                                    .options(joinedload(models.Item.offers).joinedload(models.ItemOffer.offer).joinedload(models.Offer.distributor))
                                                    .options(joinedload(models.Item.orders).joinedload(models.ItemOrder.order).joinedload(models.Order.user))
                                                    .options(joinedload(models.Item.orders).joinedload(models.ItemOrder.order).joinedload(models.Order.distributor))
                                                    .options(joinedload(models.Item.user))
                                                    .options(joinedload(models.Item.project))
                                                    .filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return items


@router.post("/Items", tags=["Items to order"])
async def post(Item: schemas.ItemCreate) -> schemas.Item:
    try:
        Item = models.Item(**Item.dict())
        Db.session.add(Item)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return Item


@router.put("/Items", tags=["Items to order"])
async def put(Item: schemas.ItemEdit) -> schemas.ItemEdit:
    try:
        Db.session.query(models.Item).filter(models.Item.id == Item.id).update({
            'name': Item.name,
            'category': Item.category,
            'quantity': Item.quantity,
            'status': Item.status,
            'idUser': Item.idUser,
            'idProject': Item.idProject
        }, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return Item


@router.delete("/Items/{id}", tags=["Items to order"])
async def delete(id: int):
    try:
        Db.session.query(models.Item).filter(models.Item.id == id).delete()
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return {"Deleted id": id}
    

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

@router.get("/Inquiries", tags=["Inquiries"])
async def get(id: Optional[int] = None, idDistributor: Optional[int] = None, dateAndTime: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Inquiry]:
    try:
        parameters = { "id": id, "idDistributor": idDistributor, "dateAndTime": dateAndTime }
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Inquiry, attribute) == value for attribute, value in selectedParameters.items()]

        inquiries = paginate(Db.session.query(models.Inquiry).options(joinedload(models.Inquiry.items).joinedload(models.ItemInquiry.item))
                                                .options(joinedload(models.Inquiry.user))
                                                .options(joinedload(models.Inquiry.distributor))
                                                .filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return inquiries

@router.post("/Inquiries", tags=["Inquiries"])
async def post(inquiry: schemas.InquiryCreate) -> schemas.Inquiry:
    try:
        inquiry = models.Inquiry(**inquiry.dict())
        inquiry.dateAndTime = datetime.now()
        Db.session.add(inquiry)
        Db.session.commit()
        Db.session.refresh(inquiry)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return inquiry

@router.put("/Inquiries/{id}", tags=["Inquiries"])
async def put(id: int, inquiry: schemas.Inquiry) -> schemas.Distributor:
    try:
        Db.session.query(models.Inquiry).filter(models.Inquiry.id == id).update({**inquiry.dict()}, synchronize_session = False)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return inquiry

@router.delete("/Inquiries/{id}", tags=["Inquiries"])
async def delete(id: int):
    try:
        Db.session.query(models.Inquiry).filter(models.Inquiry.id == id).delete()
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return {"Deleted id": id}

@router.get("/Orders", tags=["Orders"])
async def get(id: Optional[int] = None, idDistributor: Optional[int] = None, dateAndTime: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Order]:
    try:
        parameters = { "id": id, "idDistributor": idDistributor, "dateAndTime": dateAndTime }
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Order, attribute) == value for attribute, value in selectedParameters.items()]

        orders = paginate(Db.session.query(models.Order).options(joinedload(models.Order.items).joinedload(models.ItemOrder.item))
                                                        .options(joinedload(models.Order.user))
                                                        .options(joinedload(models.Order.distributor))
                                                        .filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return orders

@router.post("/Orders", tags=["Orders"])
async def post(order: schemas.OrderCreate) -> schemas.Order:
    try:
        order = models.Order(**order.dict())
        order.dateAndTime = datetime.now()
        Db.session.add(order)
        Db.session.commit()
        Db.session.refresh(order)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return order

@router.get("/Offers", tags=["Offers"])
async def get(id: Optional[int] = None, idDistributor: Optional[int] = None, dateAndTime: Optional[str] = None, page: Optional[int] = 1, size: Optional[int] = 50) -> List[schemas.Offer]:
    try:
        parameters = { "id": id, "idDistributor": idDistributor, "dateAndTime": dateAndTime }
        selectedParameters = {key: value for key, value in parameters.items() if value is not None}
        filters = [getattr(models.Order, attribute) == value for attribute, value in selectedParameters.items()]

        offers = paginate(Db.session.query(models.Offer).options(joinedload(models.Offer.items).joinedload(models.ItemOffer.item))
                                                        .options(joinedload(models.Offer.user))
                                                        .options(joinedload(models.Offer.distributor))
                                                        .filter(and_(*filters)), page, size)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return offers

@router.post("/Offers", tags=["Offers"])
async def post(offer: schemas.OfferCreate) -> schemas.Offer:
    try:
        offer = models.Offer(**offer.dict())
        offer.dateAndTime = datetime.now()
        Db.session.add(offer)
        Db.session.commit()
        Db.session.refresh(offer)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return offer

@router.post("/InquiriesItems", tags=["InquiriesItems"])
async def post(inquiryItems: List[schemas.InquiryItemCreate]) -> schemas.InquiryItem:
    try:
        InquiryItem = []
        for inquiryItem in inquiryItems:
            InquiryItem.append(models.ItemInquiry(Item_id = inquiryItem.Item_id, 
                                                  inquiry_id = inquiryItem.inquiry_id, 
                                                  quantity = inquiryItem.quantity, 
                                                  status = inquiryItem.status))
        
        Db.session.add_all(InquiryItem)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return InquiryItem



@router.post("/OrdersItems", tags=["OrdersItems"])
async def post(orderItem: schemas.OrderItemCreate):
    try:
        OrderItem = [
            models.ItemOrder(Item_id = orderItem.Item_id, order_id = orderItem.order_id, quantity = orderItem.quantity, price = orderItem.price, status = orderItem.status)
        ]
        Db.session.add_all(OrderItem)
        Db.session.commit()
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return OrderItem

