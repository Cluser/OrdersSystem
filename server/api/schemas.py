from typing import List, Optional
from pydantic import BaseModel
from pydantic.utils import GetterDict
from sqlalchemy.sql.expression import null


class Client(BaseModel):
    id: int
    name: str
    address: str

    class Config:
        orm_mode = True

class Project(BaseModel):
    id: int
    name: str 
    # idClient: int

    class Config:
        orm_mode = True

class User(BaseModel):
    id: str
    name: str
    surname: str

    class Config:
        orm_mode = True

class Distributor(BaseModel):
    id: str
    name: str
    address: str
    phone: str

    class Config:
        orm_mode = True


class ItemInquiryGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'distributor', 'dateAndTime'}:
            return getattr(self._obj.inquiries, key)
        else:
            return super(ItemInquiryGetter, self).get(key, default)

class ItemInquiry(BaseModel):
    distributor: Distributor
    dateAndTime: str
    price: str

    class Config:
        orm_mode = True
        getter_dict = ItemInquiryGetter

class Item(BaseModel):
    id: int
    name: str
    quantity: int
    status: str
    idProject: int
    inquiries: List[ItemInquiry]

    class Config:
        orm_mode = True

class InquiryItemGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'name', 'quantity', 'status', 'idProject', 'project'}:
            return getattr(self._obj.Item, key)
        else:
            return super(InquiryItemGetter, self).get(key, default)

class InquiryItem(BaseModel):
    name: str
    quantity: int
    status: str
    idProject: int
    project: Project
    price: int

    class Config:
        orm_mode = True
        getter_dict = InquiryItemGetter

class Inquiry(BaseModel):
    distributor: Distributor
    dateAndTime: str
    Items: List[InquiryItem]

    class Config:
        orm_mode = True


class BookAuthorGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'name'}:
            return getattr(self._obj.author, key)
        else:
            return super(BookAuthorGetter, self).get(key, default)


class BookAuthorSchema(BaseModel):
    id: int
    name: str
    blurb: str

    class Config:
        orm_mode = True
        getter_dict = BookAuthorGetter


class BookSchema(BaseModel):
    id: int
    title: str
    authors: List[BookAuthorSchema]

    class Config:
        orm_mode = True


class AuthorBookGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'title'}:
            return getattr(self._obj.book, key)
        else:
            return super(AuthorBookGetter, self).get(key, default)


class AuthorBookSchema(BaseModel):
    id: int
    title: str
    blurb: str

    class Config:
        orm_mode = True
        getter_dict = AuthorBookGetter


class AuthorSchema(BaseModel):
    id: int
    name: str
    books: List[AuthorBookSchema]

    class Config:
        orm_mode = True