from sqlalchemy import Column, Integer, String
from db.general import Db

class File(Db.Base):
    __tablename__ = 'Files'
    id = Column(Integer, primary_key=True)

    name = Column(String)
    path = Column(String)

    def __init__(self, name, path):
        self.name = name
        self.path = path