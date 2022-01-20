from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db.general import Db

class Client(Db.Base):
    __tablename__ = 'clients'
    id = Column(Integer, primary_key=True)

    name = Column(String, nullable=False)
    address = Column(String)
    email = Column(String)
    phone = Column(String)
    description = Column(String)
    project = relationship("Project")

    def __init__(self, name, address, email, phone, description):
        self.name = name
        self.address = address
        self.email = email
        self.phone = phone
        self.description = description