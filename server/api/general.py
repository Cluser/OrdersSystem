from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import actions
import uvicorn


class Api:
    
    def __init__(self):

        api = FastAPI(
            title="Orders System API",
            description="This API consists of functions needed for orders system.",
            version="1.0.0",
            docs_url="/api",
            openapi_tags = [
                {"name": "Authentication", "description": "Comment 1"},
                {"name": "Clients", "description": "Comment 2"},
                {"name": "Items to order", "description": "Comment 3"},
            ]
        )

        api.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        api.include_router(actions.authentication.router)
        api.include_router(actions.clients.router)
        api.include_router(actions.projects.router)
        api.include_router(actions.items.router)
        api.include_router(actions.distributors.router)
        api.include_router(actions.inquiries.router)
        api.include_router(actions.offers.router)
        api.include_router(actions.orders.router)
        api.include_router(actions.inquiriesItems.router)
        api.include_router(actions.offersItems.router)
        api.include_router(actions.ordersItems.router)
        api.include_router(actions.contactPerson.router)
        api.include_router(actions.categories.router)
        api.include_router(actions.files.router)
        api.include_router(actions.statistic.router)


        uvicorn.run(api, host="0.0.0.0", port=8000)

        
