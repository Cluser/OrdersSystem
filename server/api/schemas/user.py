from pydantic import BaseModel

class User(BaseModel):
    id: int
    email: str
    name: str 
    surname: str

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    email: str
    name: str
    surname: str
    password: str

class UserEdit(BaseModel):
    id: int
    email: str
    name: str
    surname: str
    password: str