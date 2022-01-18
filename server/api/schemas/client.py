from pydantic import BaseModel

class Client(BaseModel):
    id: int
    name: str
    address: str

    class Config:
        orm_mode = True

class ClientCreate(BaseModel):
    name: str
    address: str

class ClientEdit(BaseModel):
    id: int
    name: str
    address: str