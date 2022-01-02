from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from db.general import Db


class Client(Db.Base):
    __tablename__ = 'clients'
    id = Column(Integer, primary_key=True)

    name = Column(String, nullable=False, unique=True)
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
    ItemToOrder = relationship("ItemToOrder")
    client = relationship("Client", viewonly=True)

    def __init__(self, idClient, name):
        self.idClient = idClient
        self.name = name

class User(Db.Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)

    name = Column(String)
    surname = Column(String)

    def __init__(self, name, surname):
        self.name = name
        self.surname = surname

class Distributor(Db.Base):
    __tablename__ = 'distributors'
    id = Column(Integer, primary_key=True)

    name = Column(String)
    address = Column(String)
    phone = Column(String)

    itemToOrder = relationship('ItemToOrder')
    inquiry = relationship("Inquiry")

    def __init__(self, name, address, phone):
        self.name = name
        self.address = address
        self.phone = phone

class ItemToOrder(Db.Base):
    __tablename__ = 'itemsToOrder'
    id = Column(Integer, primary_key=True)
    idProject = Column(Integer, ForeignKey('projects.id'))
    idDistributor = Column(Integer, ForeignKey('distributors.id'))

    name = Column(String, nullable = False, unique = True)
    quantity = Column(Integer)
    status = Column(String)
    project = relationship("Project", lazy = "joined", viewonly=True)
    distributor = relationship("Distributor", lazy = "joined", viewonly=True)

    def __init__(self, idProject, idDistributor, name, quantity, status):
        self.idProject = idProject
        self.idDistributor = idDistributor
        self.name = name
        self.quantity = quantity
        self.status = status

class Inquiry(Db.Base):
    __tablename__ = 'inquiries'
    id = Column(Integer, primary_key=True)
    idDistributor = Column(Integer, ForeignKey('distributors.id'))

    dateAndTime = Column(String)

    distributor = relationship("Distributor", lazy = "joined", viewonly=True)

    def __init__(self, idDistributor, dateAndTime):
        self.idDistributor = idDistributor
        self.dateAndTime = dateAndTime


class BookAuthor(Db.Base):
    __tablename__ = 'book_authors'
    book_id = Column(ForeignKey('books.id'), primary_key=True)
    author_id = Column(ForeignKey('authors.id'), primary_key=True)
    blurb = Column(String, nullable=False)

class Book(Db.Base):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    authors = relationship("Author", secondary="book_authors", viewonly=True)

class Author(Db.Base):
    __tablename__ = 'authors'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    books = relationship("Book", secondary="book_authors", viewonly=True)