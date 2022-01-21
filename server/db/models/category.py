from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db.general import Db

class Category(Db.Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)

    name = Column(String)

    item = relationship("Item")

    def __init__(self, name):
        self.name = name