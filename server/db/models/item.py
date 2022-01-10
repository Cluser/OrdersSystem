from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.general import Db


class Item(Db.Base):
    __tablename__ = 'Items'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idProject = Column(Integer, ForeignKey('projects.id'))

    name = Column(String, nullable = False)
    category = Column(String)
    quantity = Column(Integer)
    status = Column(String)

    user = relationship("User", back_populates="item")
    project = relationship("Project", back_populates="item")
    inquiries = relationship('ItemInquiry', back_populates="item")
    offers = relationship('ItemOffer', back_populates="item")
    orders = relationship('ItemOrder', back_populates="item")

    def __init__(self, idUser, idProject, name, category, quantity, status):
        self.idUser = idUser
        self.idProject = idProject
        self.name = name
        self.category = category
        self.quantity = quantity
        self.status = status