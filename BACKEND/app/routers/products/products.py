# Aqui van a ir todas las rutas del usuario, todos los endpoints que se necesiten para el usuario
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status

from app.schemas.schemas import ProductSchema
from app.db.database import get_db
from app.repository.products_repository import create_product, read_product, update_product, delete_product, read_products_all

from app.oauth import get_current_user

router = APIRouter(prefix=f"/products", tags=["products"])

@router.post("/create_product/{user_id}", status_code= status.HTTP_200_OK)
def create_products(user_id:int, schema_product: ProductSchema, db: Session = Depends(get_db), current_user: ProductSchema = Depends(get_current_user)):
    response = create_product(user_id, schema_product, db)
    return response

@router.get("/read_product/{user_id}", status_code= status.HTTP_200_OK)
def read_products(user_id:int, product_id:int, db: Session = Depends(get_db), current_user: ProductSchema = Depends(get_current_user)):
    response = read_product(user_id, product_id, db)
    return response

@router.get("/read_products_all/{user_id}", status_code= status.HTTP_200_OK)
def products_all(user_id:int, db: Session = Depends(get_db), current_user: ProductSchema = Depends(get_current_user)):
    response = read_products_all(user_id, db)
    return response

@router.patch("/update_product/{user_id}/{product_id}", status_code= status.HTTP_200_OK)
def update_products(user_id:int, product_id:int, schema_product: ProductSchema, db: Session = Depends(get_db), current_user: ProductSchema = Depends(get_current_user)):
    response = update_product(user_id, product_id, schema_product, db)
    return response

@router.delete("/delete_product/{user_id}/{product_id}", status_code= status.HTTP_200_OK)
def delete_products(user_id:int, product_id:int, db: Session = Depends(get_db), current_user: ProductSchema = Depends(get_current_user)):
    response = delete_product(user_id, product_id, db)
    return response