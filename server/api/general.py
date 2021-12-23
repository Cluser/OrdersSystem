from fastapi import FastAPI
from . import authentication, actions
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
        api.include_router(authentication.router)
        api.include_router(actions.router)
        uvicorn.run(api, host="0.0.0.0", port=8000)