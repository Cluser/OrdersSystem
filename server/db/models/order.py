from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.general import Db

class Order(Db.Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idDistributor = Column(Integer, ForeignKey('distributors.id'))
    idContactPerson = Column(Integer, ForeignKey('contactPersons.id'))

    dateAndTime = Column(String)

    user = relationship("User", back_populates="order")
    distributor = relationship("Distributor", back_populates="order")
    contactPerson = relationship("ContactPerson", back_populates="order")
    items = relationship('ItemOrder', back_populates="order")

    def __init__(self, idUser, idDistributor, idContactPerson):
        self.idUser = idUser
        self.idDistributor = idDistributor
        self.idContactPerson = idContactPerson