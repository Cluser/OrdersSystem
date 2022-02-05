from pydantic import BaseModel
from pydantic.utils import GetterDict
from typing import List

from .project import Project
from .user import User
from .distributor import Distributor
from .contactPerson import ContactPerson


class OfferItemGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'name', 'model', 'category', 'quantity', 'comment', 'project'}:
            return getattr(self._obj.item, key)
        else:
            return super(OfferItemGetter, self).get(key, default)

class OfferItem(BaseModel):
    id: int
    name: str
    model: str
    category: str
    quantity: int
    comment: str
    project: Project
    price: float

    class Config:
        orm_mode = True
        getter_dict = OfferItemGetter

class OfferItemCreate(BaseModel):
    Item_id: int
    offer_id: int
    quantity: int
    price: float

class Offer(BaseModel):
    id: int
    user: User
    distributor: Distributor
    contactPerson: ContactPerson
    dateAndTime: str
    archived: bool
    items: List[OfferItem]

    class Config:
        orm_mode = True

class OfferCreate(BaseModel):
    idUser: int
    idDistributor: int
    idContactPerson: int
    archived: bool

class OfferEdit(BaseModel):
    id: int
    idUser: int
    idDistributor: int
    idContactPerson: int
    archived: bool


