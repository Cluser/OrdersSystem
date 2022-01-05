from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from fastapi_pagination import Page, add_pagination, paginate

app = FastAPI()



class User(BaseModel):
    name: str
    surname: str


users = [
    User(name='Yurii', surname='Karabas'),
    # ...
]


@app.get('/users', response_model=Page[User])
async def get_users():
    return paginate(users)




add_pagination(app)

uvicorn.run(app, host="0.0.0.0", port=8000)