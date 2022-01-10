from pydantic import BaseModel
from pydantic.utils import GetterDict
from typing import List

from .user import User
from .distributor import Distributor
from .project import Project


class InquiryItemGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'name', 'quantity', 'status', 'project'}:
            return getattr(self._obj.item, key)
        else:
            return super(InquiryItemGetter, self).get(key, default)

class InquiryItem(BaseModel):
    id: int
    name: str
    quantity: int
    status: str
    project: Project

    class Config:
        orm_mode = True
        getter_dict = InquiryItemGetter

class InquiryItemCreate(BaseModel):
    Item_id: int
    inquiry_id: int
    quantity: int
    status: str


class Inquiry(BaseModel):
    id: int
    user: User
    distributor: Distributor
    dateAndTime: str
    items: List[InquiryItem]

    class Config:
        orm_mode = True

class InquiryCreate(BaseModel):
    idUser: int
    idDistributor: int


