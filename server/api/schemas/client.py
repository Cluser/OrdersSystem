from pydantic import BaseModel

class Client(BaseModel):
    id: int
    name: str
    address: str
    email: str
    phone: str
    description: str

    class Config:
        orm_mode = True

class ClientCreate(BaseModel):
    name: str
    address: str
    email: str
    phone: str
    description: str

class ClientEdit(BaseModel):
    id: int
    name: str
    address: str
    email: str
    phone: str
    description: str