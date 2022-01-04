from db.general import *
from db.models import *
from api.general import *

class Main:
    # Call modules
    db = Db()

    book1 = Book(title="Dead People Who'd Be Influencers Today")
    book2 = Book(title="How To Make Friends In Your 30s")

    author1 = Author(name="Blu Renolds")
    author2 = Author(name="Chip Egan")
    author3 = Author(name="Alyssa Wyatt")

    Db.session.add_all([book1, book2, author1, author2, author3])
    Db.session.commit()

    book_author1 = BookAuthor(book_id=book1.id, author_id=author1.id, blurb="Blue wrote chapter 1")
    book_author2 = BookAuthor(book_id=book1.id, author_id=author2.id, blurb="Chip wrote chapter 2")
    book_author3 = BookAuthor(book_id=book2.id, author_id=author1.id, blurb="Blue wrote chapters 1-3")
    book_author4 = BookAuthor(book_id=book2.id, author_id=author3.id, blurb="Alyssa wrote chapter 4")

    Db.session.add_all([book_author1, book_author2, book_author3, book_author4])
    Db.session.commit()

    api = Api()




    # db_book = Db.session.query(Book).\
    #     options(joinedload(Book.authors)).\
    #     where(Book.id == 1).one()

    # schema_book = BookSchema.from_orm(db_book)
    # print(schema_book.json())