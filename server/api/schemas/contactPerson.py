from pydantic import BaseModel
from .distributor import Distributor


class ContactPerson(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    description: str
    distributor: Distributor

    class Config:
        orm_mode = True

class ContactPersonCreate(BaseModel):
    name: str
    phone: str
    email: str
    description: str
    idDistributor: int

class ContactPersonEdit(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    description: str
    idDistributor: int


