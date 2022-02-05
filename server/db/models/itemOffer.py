from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Float
from db.general import Db

class ItemOffer(Db.Base):
    __tablename__ = 'Items_offers'
    id = Column(Integer, primary_key=True)
    Item_id = Column(ForeignKey('Items.id'))
    offer_id = Column(ForeignKey('offers.id'))
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    item = relationship('Item', back_populates="offers")
    offer = relationship('Offer', back_populates="items")