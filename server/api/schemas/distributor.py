from pydantic import BaseModel

class Distributor(BaseModel):
    id: str
    name: str
    address: str
    phone: str
    email: str
    description: str

    class Config:
        orm_mode = True

class DistributorCreate(BaseModel):
    name: str
    address: str
    phone: str
    email: str
    description: str