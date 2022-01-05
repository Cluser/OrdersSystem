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
    Item = relationship("Item")
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
    Item_id = Column(ForeignKey('Items.id'), primary_key=True)
    inquiry_id = Column(ForeignKey('inquiries.id'), primary_key=True)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    status = Column(String, nullable=False)
    item = relationship('Item', back_populates="inquiries")
    inquiry = relationship('Inquiry', back_populates="items")

class ItemOrder(Db.Base):
    __tablename__ = 'Items_orders'
    Item_id = Column(ForeignKey('Items.id'), primary_key=True)
    order_id = Column(ForeignKey('orders.id'), primary_key=True)
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
    project = relationship("Project", lazy = "joined", viewonly=True)
    inquiries = relationship('ItemInquiry', back_populates="item")
    orders = relationship('ItemOrder', back_populates="item")

    def __init__(self, idUser, idProject, idDistributor, name, quantity, status):
        self.idUser = idUser
        self.idProject = idProject
        self.idDistributor = idDistributor
        self.name = name
        self.quantity = quantity
        self.status = status

class Inquiry(Db.Base):
    __tablename__ = 'inquiries'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idDistributor = Column(Integer, ForeignKey('distributors.id'))

    dateAndTime = Column(String)
    inquiriedBy = Column(String)

    user = relationship("User", back_populates="inquiry")
    distributor = relationship("Distributor", back_populates="inquiry")
    items = relationship('ItemInquiry', back_populates="inquiry")

    def __init__(self, idUser, idDistributor, dateAndTime, inquiriedBy):
        self.idUser = idUser
        self.idDistributor = idDistributor
        self.dateAndTime = dateAndTime
        self.inquiriedBy = inquiriedBy

class Order(Db.Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    idUser = Column(Integer, ForeignKey('users.id'))
    idDistributor = Column(Integer, ForeignKey('distributors.id'))

    dateAndTime = Column(String)
    orderedBy = Column(String)

    user = relationship("User", back_populates="order")
    distributor = relationship("Distributor", back_populates="order")
    items = relationship('ItemOrder', back_populates="order")

    def __init__(self, idUser, idDistributor, dateAndTime, orderedBy):
        self.idUser = idUser
        self.idDistributor = idDistributor
        self.dateAndTime = dateAndTime
        self.orderedBy = orderedBy

class BookAuthor(Db.Base):
    __tablename__ = 'book_authors'
    book_id = Column(ForeignKey('books.id'), primary_key=True)
    author_id = Column(ForeignKey('authors.id'), primary_key=True)
    blurb = Column(String, nullable=False)
    book = relationship("Book", back_populates="authors")
    author = relationship("Author", back_populates="books")

class Book(Db.Base):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    authors = relationship("BookAuthor", back_populates="book")

class Author(Db.Base):
    __tablename__ = 'authors'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    books = relationship("BookAuthor", back_populates="author")