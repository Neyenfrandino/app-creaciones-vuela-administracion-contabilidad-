from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status

from app.schemas.schemas import ProductMaterialSchema
from app.db.database import get_db
from app.repository.products_material_respository import create_product_material, read_product_material, update_product_material, delete_product_material

from app.oauth import get_current_user

router = APIRouter(prefix=f"/products_material", tags=["products_material"])

@router.post("/create_product_material", status_code= status.HTTP_201_CREATED)
def create_products_material(user_id:int, schema_product_material: ProductMaterialSchema, db: Session = Depends(get_db), current_user: ProductMaterialSchema = Depends(get_current_user)):
    response = create_product_material(user_id, schema_product_material, db)
    return response

@router.get("/read_product_material", status_code= status.HTTP_200_OK)
def read_products_material(user_id:int, product_material_id:int, db: Session = Depends(get_db), current_user: ProductMaterialSchema = Depends(get_current_user)):
    response = read_product_material(user_id, product_material_id, db)
    return response

@router.patch("/update_product_material", status_code= status.HTTP_200_OK)
def update_products_material(user_id:int, product_material_id:int, schema_product_material: ProductMaterialSchema, db: Session = Depends(get_db), current_user: ProductMaterialSchema = Depends(get_current_user)):
    response = update_product_material(user_id, product_material_id, schema_product_material, db)
    return response

@router.delete("/delete_product_material", status_code= status.HTTP_200_OK)
def delete_products_material(user_id:int, product_material_id:int, db: Session = Depends(get_db), current_user: ProductMaterialSchema = Depends(get_current_user)):
    response = delete_product_material(user_id, product_material_id, db)        
    return response