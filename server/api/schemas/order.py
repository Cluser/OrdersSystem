from pydantic import BaseModel
from pydantic.utils import GetterDict
from typing import List

from .project import Project
from .user import User
from .distributor import Distributor
from .contactPerson import ContactPerson

class OrderItemGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'name', 'model', 'category', 'quantity', 'comment', 'project', 'currency'}:
            return getattr(self._obj.item, key)
        else:
            return super(OrderItemGetter, self).get(key, default)

class OrderItem(BaseModel):
    id: int
    name: str
    model: str
    category: str
    quantity: int
    comment: str
    project: Project
    price: float
    currency: str

    class Config:
        orm_mode = True
        getter_dict = OrderItemGetter

class OrderItemCreate(BaseModel):
    Item_id: int
    order_id: int
    quantity: int
    price: float
    currency: str

class OrderItemEdit(BaseModel):
    id: int
    quantity: int
    price: float

class Order(BaseModel):
    id: int
    user: User
    distributor: Distributor
    contactPerson: ContactPerson
    dateAndTime: str
    archived: bool
    items: List[OrderItem]

    class Config:
        orm_mode = True

class OrderCreate(BaseModel):
    idUser: int
    idDistributor: int
    idContactPerson: int
    archived: bool

class OrderEdit(BaseModel):
    id: int
    idUser: int
    idDistributor: int
    idContactPerson: int
    archived: bool