from typing import List
from pydantic import BaseModel
from pydantic.utils import GetterDict
from sqlalchemy.sql.expression import null


class Client(BaseModel):
    id: int
    name: str
    address: str

    class Config:
        orm_mode = True

class ClientCreate(BaseModel):
    name: str
    address: str

class Project(BaseModel):
    id: int
    name: str 

    class Config:
        orm_mode = True

class ProjectCreate(BaseModel):
    name: str 
    idClient: int

class User(BaseModel):
    id: int
    name: str
    surname: str

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    name: str
    surname: str


class Distributor(BaseModel):
    id: str
    name: str
    address: str
    phone: str

    class Config:
        orm_mode = True

class DistributorCreate(BaseModel):
    name: str
    address: str
    phone: str


class ItemInquiryGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'user', 'distributor', 'dateAndTime', 'inquiriedBy'}:
            return getattr(self._obj.inquiry, key)
        else:
            return super(ItemInquiryGetter, self).get(key, default)

class ItemInquiry(BaseModel):
    id: int
    user: User
    distributor: Distributor
    dateAndTime: str
    inquiriedBy: str
    quantity: int
    price: float
    status: str

    class Config:
        orm_mode = True
        getter_dict = ItemInquiryGetter

class ItemOrderGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'user', 'distributor', 'dateAndTime', 'orderedBy'}:
            return getattr(self._obj.order, key)
        else:
            return super(ItemOrderGetter, self).get(key, default)


class ItemOrder(BaseModel):
    id: int
    user: User
    distributor: Distributor
    dateAndTime: str
    orderedBy: str
    quantity: int
    price: float
    status: str

    class Config:
        orm_mode = True
        getter_dict = ItemOrderGetter

class OrderItemGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'name', 'quantity', 'status', 'project'}:
            return getattr(self._obj.item, key)
        else:
            return super(OrderItemGetter, self).get(key, default)

class OrderItem(BaseModel):
    id: int
    name: str
    quantity: int
    status: str
    project: Project
    price: float

    class Config:
        orm_mode = True
        getter_dict = OrderItemGetter

class OrderItemCreate(BaseModel):
    Item_id: int
    order_id: int
    quantity: int
    price: float
    status: str

class Item(BaseModel):
    id: int
    name: str
    quantity: int
    status: str
    user: User
    project: Project
    inquiries: List[ItemInquiry]
    orders: List[ItemOrder]

    class Config:
        orm_mode = True

class ItemCreate(BaseModel):
    name: str
    quantity: int
    status: str
    idUser: int
    idProject: int

class ItemEdit(BaseModel):
    id: int
    name: str
    quantity: int
    status: str
    idUser: int
    idProject: int

class InquiryItemGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'name', 'quantity', 'status', 'project'}:
            return getattr(self._obj.item, key)
        else:
            return super(InquiryItemGetter, self).get(key, default)

class InquiryItem(BaseModel):
    id: int
    name: str
    quantity: int
    status: str
    project: Project
    price: float
    status: str

    class Config:
        orm_mode = True
        getter_dict = InquiryItemGetter

class Inquiry(BaseModel):
    id: int
    user: User
    distributor: Distributor
    dateAndTime: str
    inquiriedBy: str
    items: List[InquiryItem]

    class Config:
        orm_mode = True

class InquiryCreate(BaseModel):
    idUser: int
    idDistributor: int
    dateAndTime: str
    inquiriedBy: str

class Order(BaseModel):
    id: int
    user: User
    distributor: Distributor
    dateAndTime: str
    orderedBy: str
    items: List[OrderItem]

    class Config:
        orm_mode = True

class OrderCreate(BaseModel):
    idUser: int
    idDistributor: int
    dateAndTime: str
    orderedBy: str

