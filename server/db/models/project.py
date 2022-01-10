from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.general import Db

class Project(Db.Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    idClient = Column(Integer, ForeignKey('clients.id'))

    name = Column(String)
    item = relationship("Item")
    client = relationship("Client", viewonly=True)

    def __init__(self, idClient, name):
        self.idClient = idClient
        self.name = name