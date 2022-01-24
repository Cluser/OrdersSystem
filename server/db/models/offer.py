from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db.general import Db


class Offer(Db.Base):
    __tablename__ = 'offers'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idDistributor = Column(Integer, ForeignKey('distributors.id'))
    idContactPerson = Column(Integer, ForeignKey('contactPersons.id'))

    dateAndTime = Column(String)
    archived = Column(Boolean)

    user = relationship("User", back_populates="offer")
    distributor = relationship("Distributor", back_populates="offer")
    contactPerson = relationship("ContactPerson", back_populates="offer")
    items = relationship('ItemOffer', back_populates="offer")

    def __init__(self, idUser, idDistributor, idContactPerson, archived):
        self.idUser = idUser
        self.idDistributor = idDistributor
        self.idContactPerson = idContactPerson
        self.archived = archived