from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.general import Db

class ItemInquiry(Db.Base):
    __tablename__ = 'Items_inquiries'
    id = Column(Integer, primary_key=True)
    Item_id = Column(ForeignKey('Items.id'))
    inquiry_id = Column(ForeignKey('inquiries.id'))
    quantity = Column(Integer, nullable=False)
    item = relationship('Item', back_populates="inquiries")
    inquiry = relationship('Inquiry', back_populates="items")