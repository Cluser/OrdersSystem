from typing import List, Optional
from pydantic import BaseModel
from pydantic.utils import GetterDict
from sqlalchemy.sql.expression import null


class Client(BaseModel):
    name: str
    address: str

    class Config:
        orm_mode = True

class Project(BaseModel):
    name: str 
    idClient: int

    class Config:
        orm_mode = True

class User(BaseModel):
    name: str
    surname: str

    class Config:
        orm_mode = True

class Distributor(BaseModel):
    name: str
    address: str
    phone: str

    class Config:
        orm_mode = True

class ItemToOrder(BaseModel):
    name: str
    quantity: int
    status: str
    idProject: int
    idDistributor: int

    class Config:
        orm_mode = True

class Inquiry(BaseModel):
    idDistributor: int
    dateAndTime: str
    price: Optional[int]

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