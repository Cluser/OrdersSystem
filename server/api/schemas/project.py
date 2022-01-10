from pydantic import BaseModel

class Project(BaseModel):
    id: int
    name: str 

    class Config:
        orm_mode = True

class ProjectCreate(BaseModel):
    name: str 
    idClient: int