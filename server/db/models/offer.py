from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.general import Db


class Offer(Db.Base):
    __tablename__ = 'offers'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idDistributor = Column(Integer, ForeignKey('distributors.id'))

    dateAndTime = Column(String)

    user = relationship("User", back_populates="offer")
    distributor = relationship("Distributor", back_populates="offer")
    items = relationship('ItemOffer', back_populates="offer")

    def __init__(self, idUser, idDistributor):
        self.idUser = idUser
        self.idDistributor = idDistributor