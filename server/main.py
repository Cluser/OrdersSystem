from db.general import *
from db.models import *
from api.general import *

class Main:
    # Call modules
    db = Db()

    client = [
        Client(name = "Client 1", address = "Client 1 address")
    ]

    project = [
        Project(name = "Project 1", idClient = 1),
        Project(name = "Project 2", idClient = 1)
    ]

    item = [        
        Item(name = "Item 1", idProject = 1, idDistributor = 1, quantity = 3, status = "Item 1 status"),
        Item(name = "Item 2", idProject = 1, idDistributor = 1, quantity = 2, status = "Item 2 status"),
        Item(name = "Item 3", idProject = 1, idDistributor = 1, quantity = 6, status = "Item 3 status")
    ]

    
    distributor = [
        Distributor(name = "Distributor 1", address = "Distributor 1 address", phone = "500 600 700")
    ]

    inquiry = [
        Inquiry(idDistributor = 1, dateAndTime = "04.02.2021")
    ]

    order = [
        Order(idDistributor = 1, dateAndTime = "04.02.2021")
    ]

    itemInquiry = [
        ItemInquiry(Item_id = 1, inquiry_id = 1, price = 150, status = "Do zamówienia"),
        ItemInquiry(Item_id = 2, inquiry_id = 1, price = 150, status = "Do zamówienia")
    ]

    itemOrder = [
        ItemOrder(Item_id = 1, order_id = 1, price = 150, status = "Zamówione"),
        ItemOrder(Item_id = 2, order_id = 1, price = 170, status = "Zamówione")
    ]

    Db.session.add_all(client)
    Db.session.add_all(project)
    Db.session.add_all(item)
    Db.session.add_all(distributor)
    Db.session.add_all(inquiry)
    Db.session.add_all(order)
    Db.session.add_all(itemInquiry)
    Db.session.add_all(itemOrder)
    Db.session.commit()

     

    api = Api()



