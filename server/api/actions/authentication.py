from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from fastapi import APIRouter
from db.general import *
from db import models
from api import schemas
from datetime import datetime, timedelta
from jose import JWTError, jwt
import settings


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


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
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm = settings.ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms= [settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = Db.session.query(models.User).filter(models.User.name == username).first()
    if user is None:
        raise credentials_exception
    return user


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


@router.post("/login", tags=["Authentication"])
async def login(data: OAuth2PasswordRequestForm = Depends()):

    user = Db.session.query(models.User).filter(models.User.name == data.username).first()

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    if not verifyPassword(data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token_expires = timedelta(minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = createAccessToken(
        data={"sub": user.name}, expires_delta=access_token_expires
    )


    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/token", tags=["Authentication"])
async def login(token: str = Depends(get_current_user)):

    return token
