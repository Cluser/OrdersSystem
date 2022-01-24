from db.general import *
from db.models import *
from api.general import *

from faker import Faker
from faker.providers import DynamicProvider
from random import randrange

class Main:
    # Call modules
    db = Db()

    faker = Faker()

    clientsProvider = DynamicProvider(
        provider_name  ="client",
        elements = ['Bosch', 'Mahle', 'Tesla', 'Dana']
    )

    projectsProvider = DynamicProvider(
        provider_name  ="project",
        elements = ['22-001', '22-002', '22-003', '22-004', '22-005']
    )

    distributorsProvider = DynamicProvider(
        provider_name  ="distributor",
        elements = ['RA Controls', 'Siemens', 'Sick', 'Schneider', 'Elkan', 'Festo', 'SMC']
    )

    
    categoriesProvider = DynamicProvider(
        provider_name  ="category",
        elements = ['Mechanika', 'Elektryka', 'Pneumatyka', 'Software', 'Inne']
    )


    faker.add_provider(clientsProvider)
    faker.add_provider(projectsProvider)
    faker.add_provider(distributorsProvider)
    faker.add_provider(categoriesProvider)


    client = []
    for clientName in clientsProvider.elements:
        client.append(Client(name = clientName,  address = faker.address(), email = clientName + '@mail.com', phone = '9999999', description = 'Description'))

    project = []
    for projectName in projectsProvider.elements:
        project.append(Project(name = projectName, idClient = 1))

    item = []
    for x in range(1, 500):
        item.append(Item(name = x, model = randrange(1, 10000), idCategory = randrange(1, 5), idUser = randrange(1, 5), idProject = randrange(1, 5), quantity = randrange(1, 50), status = "Do zamówienia", comment = "Komentarz przedmiotu"))


    user = []
    for x in range(1, 5):
        user.append(User(name = faker.name(), surname = faker.name()))



    distributor = []
    for distributorName in distributorsProvider.elements:
        distributor.append(Distributor(name = distributorName, address = faker.address(), phone = '899 777 444', email = distributorName + '@mail.com', description = "Dystrybutor części"))

    contactPerson = []
    for x in range(1, 30):
        contactPerson.append(ContactPerson(idDistributor = randrange(1, 7), name = faker.name(), phone = '899 777 444', email = 'email@email.com', description = "Sprzedawca"))


    category = []
    for categoryName in categoriesProvider.elements:
        category.append(Category(name = categoryName))

    inquiry = []
    for x in range(1, 10):
       inquiry.append(Inquiry(idUser = randrange(1, 5), idDistributor = randrange(1, 7), idContactPerson = randrange(1, 30)))

    offer = []
    for x in range(1, 10):
       offer.append(Offer(idUser = randrange(1, 5), idDistributor = randrange(1, 7), idContactPerson = randrange(1, 30)))

    order = []
    for x in range(1, 10):
       order.append(Order(idUser = randrange(1, 5), idDistributor = randrange(1, 7), idContactPerson = randrange(1, 30)))

    itemInquiry = []
    for x in range(1, 10):
       itemInquiry.append(ItemInquiry(Item_id = randrange(1, 500), inquiry_id = randrange(1, 50), quantity= randrange(1, 10), status = "Do zamówienia"))

    itemOffer = []
    for x in range(1, 500):
       itemOffer.append(ItemOffer(Item_id = randrange(1, 500), offer_id = randrange(1, 10), quantity = randrange(1, 10), price = randrange(10, 9999), status = "Do zamówienia"))


    itemOrder = []
    for x in range(1, 500):
       itemOrder.append(ItemOrder(Item_id = randrange(1, 500), order_id = randrange(1, 10), quantity = randrange(1, 10), price = randrange(10, 9999), status = "Do zamówienia"))


    # Db.session.add_all(client)
    # Db.session.add_all(project)
    # Db.session.add_all(user)
    # Db.session.add_all(item)
    # Db.session.add_all(distributor)
    # Db.session.add_all(contactPerson)
    # Db.session.add_all(category)
    # Db.session.add_all(inquiry)
    # Db.session.add_all(offer)
    # Db.session.add_all(order)
    # Db.session.add_all(itemInquiry)
    # Db.session.add_all(itemOffer)
    # Db.session.add_all(itemOrder)

    # Db.session.commit()     

    api = Api()


