from pydantic import BaseModel
from pydantic.utils import GetterDict
from typing import Optional, List

from .user import User
from .distributor import Distributor
from .project import Project
from .category import Category


class ItemInquiryGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'user', 'distributor', 'dateAndTime'}:
            return getattr(self._obj.inquiry, key)
        else:
            return super(ItemInquiryGetter, self).get(key, default)

class ItemInquiry(BaseModel):
    id: int
    user: User
    distributor: Distributor
    dateAndTime: str
    quantity: int
    status: str

    class Config:
        orm_mode = True
        getter_dict = ItemInquiryGetter

class ItemOrderGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'user', 'distributor', 'dateAndTime'}:
            return getattr(self._obj.order, key)
        else:
            return super(ItemOrderGetter, self).get(key, default)


class ItemOrder(BaseModel):
    id: int
    user: User
    distributor: Distributor
    dateAndTime: str
    quantity: int
    price: float
    status: str

    class Config:
        orm_mode = True
        getter_dict = ItemOrderGetter


class ItemOfferGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'user', 'distributor', 'dateAndTime'}:
            return getattr(self._obj.order, key)
        else:
            return super(ItemOfferGetter, self).get(key, default)


class ItemOffer(BaseModel):
    id: int
    user: User
    distributor: Distributor
    dateAndTime: str
    quantity: int
    price: float
    status: str

    class Config:
        orm_mode = True
        getter_dict = ItemOfferGetter

class Item(BaseModel):
    id: int
    name: str
    model: str
    quantity: int
    status: str
    dateAndTime: str
    comment: str
    archived: bool
    category: Category
    user: User
    project: Project
    inquiries: List[ItemInquiry]
    offers: List[ItemOffer]
    orders: List[ItemOrder]

    class Config:
        orm_mode = True

class ItemCreate(BaseModel):
    name: str
    model: str
    quantity: int
    comment: Optional[str]
    archived: bool
    idCategory: int
    idUser: int
    idProject: int

class ItemEdit(BaseModel):
    id: int
    name: str
    model: str
    quantity: int
    comment: Optional[str]
    archived: bool
    idCategory: int
    idUser: int
    idProject: int




