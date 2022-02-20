from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str 
    surname: str
    password: str

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    name: str
    surname: str
    password: str