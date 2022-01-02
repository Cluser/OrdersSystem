from typing import List, Optional
from pydantic import BaseModel
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

    class Config:
        orm_mode = True

class AuthorBase(BaseModel):
    id: int
    name: str
    blurb: Optional[str]

    class Config:
        orm_mode = True

class BookBase(BaseModel):
    id: int
    title: str
    blurb: Optional[str]

    class Config:
        orm_mode = True

class BookSchema(BookBase):
    authors: List[AuthorBase]

class AuthorSchema(AuthorBase):
    books: List[BookBase]