from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Float
from db.general import Db

class Inquiry(Db.Base):
    __tablename__ = 'inquiries'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idDistributor = Column(Integer, ForeignKey('distributors.id'))
    idContactPerson = Column(Integer, ForeignKey('contactPersons.id'))

    dateAndTime = Column(String)
    archived = Column(Boolean)

    user = relationship("User", back_populates="inquiry")
    distributor = relationship("Distributor", back_populates="inquiry")
    contactPerson = relationship("ContactPerson", back_populates="inquiry")
    items = relationship('ItemInquiry', back_populates="inquiry")

    def __init__(self, idUser, idDistributor, idContactPerson, archived):
        self.idUser = idUser
        self.idDistributor = idDistributor
        self.idContactPerson = idContactPerson
        self.archived = archived