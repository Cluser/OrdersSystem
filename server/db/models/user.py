from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db.general import Db

class User(Db.Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)

    name = Column(String)
    surname = Column(String)
    password = Column(String)

    item = relationship("Item", back_populates="user")
    inquiry = relationship("Inquiry", back_populates="user")
    offer = relationship('Offer', back_populates="user")
    order = relationship("Order", back_populates="user")


    def __init__(self, name, surname, password):
        self.name = name
        self.surname = surname
        self.password = password
