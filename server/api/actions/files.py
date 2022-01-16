from fastapi import APIRouter, UploadFile, File
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import FileResponse
from starlette.responses import JSONResponse
from os import getcwd, remove
from db.general import *
from db import models
from api import schemas



router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.get("/Files", tags=["Files"])
def download_file(name_file: str):
    return FileResponse(path=getcwd() + "\storage\\" + name_file, media_type='application/octet-stream', filename=name_file)

@router.post("/Files", tags=["Files"])
async def upload_file(file: UploadFile = File(...)):
    try:
        with open('storage/' + file.filename, 'wb') as uploadedFile:
            content = await file.read()
            uploadedFile.write(content)
            uploadedFile.close()
    
            fileToUpload = models.File(name = file.filename, path = "storage/" + file.filename)
            Db.session.add(fileToUpload)
            Db.session.commit()
            Db.session.refresh(fileToUpload)


    except:
        Db.session.rollback()
        raise
    finally:
        Db.session.close()
        return JSONResponse(content={"filename": file.filename}, status_code=200)


@router.delete("/Files", tags=["Files"])
def delete_file(name_file: str):
    try:
        remove(getcwd() + "/storage/" + name_file)
        return JSONResponse(content={
            "removed": True
            }, status_code=200)   
    except FileNotFoundError:
        return JSONResponse(content={
            "removed": False,
            "error_message": "File not found"
        }, status_code=404)