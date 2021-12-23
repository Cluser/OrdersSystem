from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

class Db():

    Base = declarative_base()
    engine = create_engine('sqlite:///db/database.db')
    Session = sessionmaker(bind = engine)
    session = Session()

    def __init__(self):

        if not database_exists(self.engine.url):
            create_database(self.engine.url)
        self.Base.metadata.create_all(self.engine)