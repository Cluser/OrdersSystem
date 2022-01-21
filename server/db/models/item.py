from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.general import Db


class Item(Db.Base):
    __tablename__ = 'Items'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idProject = Column(Integer, ForeignKey('projects.id'))
    idCategory = Column(Integer, ForeignKey('categories.id'))

    name = Column(String, nullable = False)
    model = Column(String)
    quantity = Column(Integer)
    status = Column(String)
    dateAndTime = Column(String)
    comment = Column(String)

    category = relationship("Category", back_populates="item")
    user = relationship("User", back_populates="item")
    project = relationship("Project", back_populates="item")
    inquiries = relationship('ItemInquiry', back_populates="item")
    offers = relationship('ItemOffer', back_populates="item")
    orders = relationship('ItemOrder', back_populates="item")

    def __init__(self, idCategory, idUser, idProject, name, model, quantity, status, comment):
        self.idCategory = idCategory
        self.idUser = idUser
        self.idProject = idProject
        self.name = name
        self.model = model
        self.quantity = quantity
        self.status = status
        self.comment = comment