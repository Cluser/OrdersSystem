from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Float
from db.general import Db

class Inquiry(Db.Base):
    __tablename__ = 'inquiries'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idDistributor = Column(Integer, ForeignKey('distributors.id'))

    dateAndTime = Column(String)

    user = relationship("User", back_populates="inquiry")
    distributor = relationship("Distributor", back_populates="inquiry")
    items = relationship('ItemInquiry', back_populates="inquiry")

    def __init__(self, idUser, idDistributor):
        self.idUser = idUser
        self.idDistributor = idDistributor