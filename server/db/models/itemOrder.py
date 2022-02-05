from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Float
from db.general import Db


class ItemOrder(Db.Base):
    __tablename__ = 'Items_orders'
    id = Column(Integer, primary_key=True)
    Item_id = Column(ForeignKey('Items.id'))
    order_id = Column(ForeignKey('orders.id'))
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    item = relationship('Item', back_populates="orders")
    order = relationship('Order', back_populates="items")