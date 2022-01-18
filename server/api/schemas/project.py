from pydantic import BaseModel
from .client import *

class Project(BaseModel):
    id: int
    name: str 
    idClient: int
    client: Client

    class Config:
        orm_mode = True

class ProjectCreate(BaseModel):
    name: str 
    idClient: int

class ProjectEdit(BaseModel):
    id: str
    name: str 
    idClient: int