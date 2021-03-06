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


def createToken(data: dict, expires_delta: timedelta | None = None):
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

def cookieExtractor(refresh_token: str | None = Cookie(None)) -> str:
    try:
        extractedToken = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms= [settings.ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail='Invalid token')

    return extractedToken


def checkPermissions(scopes: SecurityScopes, decodedToken: str = Depends(decodeToken)):
    for scope in scopes.scopes:
        if scope in decodedToken.get("scopes"):
            return decodedToken
    raise HTTPException(status_code=401, detail='Not enough permissions')


@router.post("/token", tags=["Authentication"])
async def token(data: OAuth2PasswordRequestForm = Depends()):

    verifiedUser = verifyUser(data.username)
    if not verifiedUser: raise HTTPException(status_code=400, detail="Incorrect username or password")

    verifiedPassword = verifyPassword(data.password, verifiedUser.password)
    if not verifiedPassword: raise HTTPException(status_code=400, detail="Incorrect username or password")

    idSession = 5
    access_token_expires = timedelta(minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = createToken(data={"iss": "test.com", "sub": str(verifiedUser.id), "scopes": data.scopes}, expires_delta=access_token_expires)

    refresh_token_expires = timedelta(minutes = settings.REFRESH_TOKEN_EXPIRE_MINUTES)
    refresh_token = createToken(data={"iss": "test.com", "sub": idSession, "scopes": data.scopes}, expires_delta=refresh_token_expires)

    response = JSONResponse({"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(key="refresh_token", value=refresh_token, expires=settings.REFRESH_TOKEN_EXPIRE_MINUTES*60, max_age=settings.REFRESH_TOKEN_EXPIRE_MINUTES*60, httponly=True, samesite="none", secure=True, domain="127.0.0.1")
    return response

@router.post("/refreshToken", tags=["Authentication"])
async def refreshToken(refresh_token: str = Depends(cookieExtractor)):
    access_token_expires = timedelta(minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = createToken(data={"iss": "test.com", "sub": str(1), "scopes": refresh_token.get("scopes")}, expires_delta=access_token_expires)

    refresh_token_expires = timedelta(minutes = settings.REFRESH_TOKEN_EXPIRE_MINUTES)
    refresh_token = createToken(data={"iss": "test.com", "sub": 4, "scopes": refresh_token.get("scopes")}, expires_delta=refresh_token_expires)
    
    response = JSONResponse({"access_token": access_token, "token_type": "bearer"})
    response.set_cookie(key="refresh_token", value=refresh_token, expires=settings.REFRESH_TOKEN_EXPIRE_MINUTES*60, max_age=settings.REFRESH_TOKEN_EXPIRE_MINUTES*60, httponly=True, samesite="none", secure=True, domain="127.0.0.1")
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


