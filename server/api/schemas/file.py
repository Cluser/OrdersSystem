from pydantic import BaseModel

class File(BaseModel):
    id: int
    name: str
    path: str

class FileCreate(BaseModel):
    name: str
    path: str