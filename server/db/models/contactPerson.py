from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.general import Db

class ContactPerson(Db.Base):
    __tablename__ = 'contactPersons'
    id = Column(Integer, primary_key=True)
    idDistributor = Column(Integer, ForeignKey('distributors.id'))

    name = Column(String)
    phone = Column(String)
    email = Column(String)
    description = Column(String)

    distributor = relationship("Distributor", back_populates="contactPerson")
    
    def __init__(self, name, phone, email, description, idDistributor):
        self.name = name
        self.phone = phone
        self.email = email
        self.description = description
        self.idDistributor = idDistributor