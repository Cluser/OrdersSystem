from sqlalchemy import Column, Integer, String
from db.general import Db

class Category(Db.Base):
    __tablename__ = 'Categories'
    id = Column(Integer, primary_key=True)

    name = Column(String)

    def __init__(self, name):
        self.name = name