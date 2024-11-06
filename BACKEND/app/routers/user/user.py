# Aqui van a ir todas las rutas del usuario, todos los endpoints que se necesiten para el usuario
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status

from app.schemas.schemas import Schema_user, create_user_schema
from app.db.database import get_db
from app.repository.user_repository import create_user, read_users, update_user, delete_user

from app.oauth import get_current_user

router = APIRouter(prefix=f"/user", tags=["user"])

@router.post("/create_user", response_model= Schema_user, status_code= status.HTTP_201_CREATED)
def create_users(schema_user: create_user_schema, db: Session = Depends(get_db)):
    # Convertir el esquema en un diccionario
    response = create_user(schema_user, db)
    return response

@router.get("/read_user/{user_id}", response_model= Schema_user, status_code= status.HTTP_200_OK) 
def read_users_id(user_id:int, db: Session = Depends(get_db), current_user: Schema_user=Depends(get_current_user)):
    response = read_users(user_id, db)
    return response 

@router.patch("/update_user/{user_id}", status_code= status.HTTP_200_OK)
def update_users(user_id:int, schema_user: Schema_user, db: Session = Depends(get_db), current_user: Schema_user=Depends(get_current_user)):
    response = update_user(user_id, schema_user, db)
    return response

@router.delete("/delete_user/{user_id}", status_code= status.HTTP_200_OK)
def delete_users(user_id:int, db: Session = Depends(get_db), current_user: Schema_user=Depends(get_current_user)):
    response = delete_user(user_id, db)
    return response