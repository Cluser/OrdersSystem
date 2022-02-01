from pydantic import BaseModel
from pydantic.utils import GetterDict
from typing import List

from .user import User
from .distributor import Distributor
from .contactPerson import ContactPerson
from .project import Project


class InquiryItemGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'name', 'model', 'category', 'quantity', 'status', 'comment', 'project'}:
            return getattr(self._obj.item, key)
        else:
            return super(InquiryItemGetter, self).get(key, default)

class InquiryItem(BaseModel):
    id: int
    name: str
    model: str
    category: str
    quantity: int
    status: str
    comment: str
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
    contactPerson: ContactPerson
    dateAndTime: str
    archived: bool
    items: List[InquiryItem]

    class Config:
        orm_mode = True

class InquiryCreate(BaseModel):
    idUser: int
    idDistributor: int
    idContactPerson: int
    archived: bool

class InquiryEdit(BaseModel):
    id: int
    idUser: int
    idDistributor: int
    idContactPerson: int
    archived: bool


