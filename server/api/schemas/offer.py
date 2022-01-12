from pydantic import BaseModel
from pydantic.utils import GetterDict
from typing import List

from .project import Project
from .user import User
from .distributor import Distributor


class OfferItemGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'name', 'quantity', 'status', 'comment', 'project'}:
            return getattr(self._obj.item, key)
        else:
            return super(OfferItemGetter, self).get(key, default)

class OfferItem(BaseModel):
    id: int
    name: str
    quantity: int
    status: str
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
    status: str

class Offer(BaseModel):
    id: int
    user: User
    distributor: Distributor
    dateAndTime: str
    items: List[OfferItem]

    class Config:
        orm_mode = True

class OfferCreate(BaseModel):
    idUser: int
    idDistributor: int


