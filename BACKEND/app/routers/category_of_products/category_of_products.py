from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status

from app.schemas.schemas import CategoryOfProductSchema
from app.db.database import get_db
from app.repository.category_of_products_repository import create_category, get_category_all, update_category, delete_category

from app.oauth import get_current_user

router = APIRouter(prefix=f"/category_of_products", tags=["category_of_products"])

@router.post("/create_category_of_products", status_code= status.HTTP_201_CREATED)
def create_category_of_products(user_id:int, schema_category_of_products: CategoryOfProductSchema, db: Session = Depends(get_db), current_user: CategoryOfProductSchema = Depends(get_current_user)):
    response = create_category(user_id, schema_category_of_products, db)
    return response

@router.get("/get_all_category_of_products/{user_id}", status_code= status.HTTP_200_OK)
def get_all_category_of_products(user_id:int, db: Session = Depends(get_db), current_user: CategoryOfProductSchema = Depends(get_current_user)):
    response = get_category_all(user_id, db)
    return response 

@router.patch("/update_category_of_products", status_code= status.HTTP_200_OK)
def update_category_of_products(user_id:int, category_of_products_id:int, schema_category_of_products: CategoryOfProductSchema, db: Session = Depends(get_db), current_user: CategoryOfProductSchema = Depends(get_current_user)):
    response = update_category(user_id, category_of_products_id, schema_category_of_products, db)
    return response

@router.delete("/delete_category_of_products", status_code= status.HTTP_200_OK)
def delete_category_of_products(user_id:int, category_of_products_id:int, db: Session = Depends(get_db), current_user: CategoryOfProductSchema = Depends(get_current_user)):
    response = delete_category(user_id, category_of_products_id, db)
    return response