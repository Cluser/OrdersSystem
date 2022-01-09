from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Float
from db.general import Db


class Client(Db.Base):
    __tablename__ = 'clients'
    id = Column(Integer, primary_key=True)

    name = Column(String, nullable=False)
    address = Column(String)
    project = relationship("Project")

    def __init__(self, name, address):
        self.name = name
        self.address = address

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

class User(Db.Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)

    name = Column(String)
    surname = Column(String)

    item = relationship("Item", back_populates="user")
    inquiry = relationship("Inquiry", back_populates="user")
    order = relationship("Order", back_populates="user")


    def __init__(self, name, surname):
        self.name = name
        self.surname = surname

class Distributor(Db.Base):
    __tablename__ = 'distributors'
    id = Column(Integer, primary_key=True)

    name = Column(String)
    address = Column(String)
    phone = Column(String)

    inquiry = relationship("Inquiry", back_populates="distributor")
    order = relationship("Order", back_populates="distributor")

    def __init__(self, name, address, phone):
        self.name = name
        self.address = address
        self.phone = phone

class ItemInquiry(Db.Base):
    __tablename__ = 'Items_inquiries'
    id = Column(Integer, primary_key=True)
    Item_id = Column(ForeignKey('Items.id'))
    inquiry_id = Column(ForeignKey('inquiries.id'))
    quantity = Column(Integer, nullable=False)
    status = Column(String, nullable=False)
    item = relationship('Item', back_populates="inquiries")
    inquiry = relationship('Inquiry', back_populates="items")

class ItemOrder(Db.Base):
    __tablename__ = 'Items_orders'
    id = Column(Integer, primary_key=True)
    Item_id = Column(ForeignKey('Items.id'))
    order_id = Column(ForeignKey('orders.id'))
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    status = Column(String, nullable=False)
    item = relationship('Item', back_populates="orders")
    order = relationship('Order', back_populates="items")


class Item(Db.Base):
    __tablename__ = 'Items'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idProject = Column(Integer, ForeignKey('projects.id'))

    name = Column(String, nullable = False)
    quantity = Column(Integer)
    status = Column(String)

    user = relationship("User", back_populates="item")
    project = relationship("Project", back_populates="item")
    inquiries = relationship('ItemInquiry', back_populates="item")
    orders = relationship('ItemOrder', back_populates="item")

    def __init__(self, idUser, idProject, name, quantity, status):
        self.idUser = idUser
        self.idProject = idProject
        self.name = name
        self.quantity = quantity
        self.status = status

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

class Order(Db.Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idDistributor = Column(Integer, ForeignKey('distributors.id'))

    dateAndTime = Column(String)

    user = relationship("User", back_populates="order")
    distributor = relationship("Distributor", back_populates="order")
    items = relationship('ItemOrder', back_populates="order")

    def __init__(self, idUser, idDistributor):
        self.idUser = idUser
        self.idDistributor = idDistributor
