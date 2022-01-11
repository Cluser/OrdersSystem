from pydantic import BaseModel
from pydantic.utils import GetterDict
from typing import List

from .project import Project
from .user import User
from .distributor import Distributor

class OrderItemGetter(GetterDict):
    def get(self, key: str, default = None):
        if key in {'id', 'name', 'quantity', 'status', 'project'}:
            return getattr(self._obj.item, key)
        else:
            return super(OrderItemGetter, self).get(key, default)

class OrderItem(BaseModel):
    id: int
    name: str
    quantity: int
    status: str
    project: Project
    price: float

    class Config:
        orm_mode = True
        getter_dict = OrderItemGetter

class OrderItemCreate(BaseModel):
    Item_id: int
    order_id: int
    quantity: int
    price: float
    status: str

class Order(BaseModel):
    id: int
    user: User
    distributor: Distributor
    dateAndTime: str
    items: List[OrderItem]

    class Config:
        orm_mode = True

class OrderCreate(BaseModel):
    idUser: int
    idDistributor: int