from fastapi import Cookie, Depends, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, SecurityScopes
from passlib.context import CryptContext
from fastapi import APIRouter
from db.general import *
from db import models
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse
import settings
import jwt


class Permission:
    ADMIN = "admin"
    PURCHASE = "purchase"
    STATISTICS = "statistics"
    MAGASINE = "magasine"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", scopes={
    Permission.ADMIN: "Read/Write", 
    Permission.PURCHASE: "Read/Write", 
    Permission.STATISTICS: "Read/Write",
    Permission.MAGASINE: "Read/Write"})

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

def verifyUser(username):
    return Db.session.query(models.User).filter(models.User.name == username).first()


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


async def decodeToken(token: str = Depends(oauth2_scheme)):
    try:
        decodedToken = jwt.decode(token, settings.SECRET_KEY, algorithms= [settings.ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid token')

    return decodedToken

def cookie_extractor(access_token: str | None = Cookie(None)) -> str:
    if not access_token:
        raise HTTPException(status_code=401, detail="Invalid token")
    return access_token


def checkPermissions(scopes: SecurityScopes, decodedToken: str = Depends(decodeToken)):
    for scope in scopes.scopes:
        if scope not in decodedToken.get("scopes"):
            raise HTTPException(status_code=401, detail='Not enough permissions')
    return decodedToken
        



@router.post("/token", tags=["Authentication"])
async def token(data: OAuth2PasswordRequestForm = Depends()):

    verifiedUser = verifyUser(data.username)
    verifiedPassword = verifyPassword(data.password, verifiedUser.password)

    if not verifiedUser: raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not verifiedPassword: raise HTTPException(status_code=400, detail="Incorrect username or password")

    idSession = 5
    token_expires = timedelta(minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = createAccessToken(data={"iss": "test.com", "sub": str(verifiedUser.id), "scopes": data.scopes}, expires_delta=token_expires)
    refresh_token = createAccessToken(data={"iss": "test.com", "sub": idSession, "scopes": data.scopes}, expires_delta=token_expires)

    response = JSONResponse({"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(key="refresh_token", value=refresh_token, expires=100, max_age=100, httponly=True, samesite="none", secure=True, domain="127.0.0.1")
    return response



@router.post("/login", tags=["Authentication"])
async def login(data: OAuth2PasswordRequestForm = Depends()):
    return await token(data)


@router.post("/logout", tags=["Authentication"])
async def logout():
    response = JSONResponse()
    response.set_cookie(key="refresh_token", expires=0, max_age=0, httponly=True, samesite="none", secure=True, domain="127.0.0.1")
    return response


@router.get("/getLogedInUser", tags=["Authentication"])
async def checkUser(decodedToken: str = Security(checkPermissions, scopes = [Permission.ADMIN])) -> str:
    user = Db.session.query(models.User).filter(models.User.id == decodedToken.get("sub")).first()
    return user


