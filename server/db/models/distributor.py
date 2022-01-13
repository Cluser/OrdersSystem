from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db.general import Db

class Distributor(Db.Base):
    __tablename__ = 'distributors'
    id = Column(Integer, primary_key=True)

    name = Column(String)
    address = Column(String)
    phone = Column(String)
    email = Column(String)
    description = Column(String)

    inquiry = relationship("Inquiry", back_populates="distributor")
    offer = relationship('Offer', back_populates="distributor")
    order = relationship("Order", back_populates="distributor")

    def __init__(self, name, address, phone, email, description):
        self.name = name
        self.address = address
        self.phone = phone
        self.email = email
        self.description = description