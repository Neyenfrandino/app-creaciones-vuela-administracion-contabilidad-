# Aqui van a ir todas las rutas del usuario, todos los endpoints que se necesiten para el usuario
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status

from app.schemas.schemas import SellProductSchema
from app.db.database import get_db
from app.repository.sell_products_repository import create_sell_product, get_sell_products_all, update_sell_product, delete_sell_product

from app.oauth import get_current_user

router = APIRouter(prefix=f"/sell_products", tags=["sell_products"])

@router.post("/create_sell_product/{user_id}", status_code= status.HTTP_201_CREATED)
def create_sell_products(user_id: int, schema_sell_product: SellProductSchema, db: Session = Depends(get_db), current_user: SellProductSchema = Depends(get_current_user)):
    response = create_sell_product(user_id, schema_sell_product, db)
    print(response, 'ssssssssssssssssssss')
    return response

@router.get("/get_all_sell_products/{user_id}", status_code= status.HTTP_200_OK)
def get_all_sell_products(user_id:int, db: Session = Depends(get_db), current_user: SellProductSchema = Depends(get_current_user)):
    response = get_sell_products_all(user_id, db)
    return response

@router.patch("/update_sell_product", status_code= status.HTTP_200_OK)
def update_sell_products(user_id:int, sell_product_id:int, schema_sell_product: SellProductSchema, db: Session = Depends(get_db), current_user: SellProductSchema = Depends(get_current_user)):
    response = update_sell_product(user_id, sell_product_id, schema_sell_product, db)
    return response

@router.delete("/delete_sell_product", status_code= status.HTTP_200_OK)
def delete_sell_products(user_id:int, sell_product_id:int, db: Session = Depends(get_db), current_user: SellProductSchema = Depends(get_current_user)):
    response = delete_sell_product(user_id, sell_product_id, db)
    return response