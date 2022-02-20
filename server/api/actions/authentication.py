from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from fastapi import APIRouter
from db.general import *
from db import models
from api import schemas
from datetime import datetime, timedelta
from jose import JWTError, jwt


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verifyPassword(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def getPasswordHash(password):
    return pwd_context.hash(password)

def createAccessToken(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/register", tags=["Authentication"])
async def post(usr: schemas.UserCreate) -> schemas.UserCreate:
    try:
        user = models.User(**usr.dict())
        user.password = getPasswordHash(usr.password)
        Db.session.add(user)
        Db.session.commit()
        Db.session.refresh(user)
    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return "User created"


@router.post("/token", tags=["Authentication"])
async def login(form_data: OAuth2PasswordRequestForm = Depends()):

    user = Db.session.query(models.User).filter(models.User.name == form_data.username).first()

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    if not verifyPassword(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = createAccessToken(
        data={"sub": user.name}, expires_delta=access_token_expires
    )


    return {"access_token": access_token, "token_type": "bearer"}
