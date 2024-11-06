from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status

from app.schemas.schemas import StockMateriaPrimaSchema
from app.db.database import get_db
from app.repository.stock_materia_prima_repository import create_materia_prima, get_materia_prima_all, update_materia_prima, delete_materia_prima
from app.oauth import get_current_user

router = APIRouter(prefix=f"/stock_materia_prima", tags=["stock_materia_prima"])

@router.post("/create_stock_materia_prima/{user_id}", status_code= status.HTTP_201_CREATED)
def create_stock_materia_prima(user_id:int, schema_stock_materia_prima: StockMateriaPrimaSchema, db: Session = Depends(get_db), current_user: StockMateriaPrimaSchema = Depends(get_current_user)):
    response = create_materia_prima(user_id, schema_stock_materia_prima, db)
    return response

@router.get("/get_all_stock_materia_prima", status_code= status.HTTP_200_OK)
def get_all_stock_materia_prima(user_id:int, db: Session = Depends(get_db), current_user: StockMateriaPrimaSchema = Depends(get_current_user)):
    response = get_materia_prima_all(user_id, db)
    return response

@router.patch("/update_stock_materia_prima", status_code= status.HTTP_200_OK)
def update_stock_materia_prima(user_id:int, stock_materia_prima_id:int, schema_stock_materia_prima: StockMateriaPrimaSchema, db: Session = Depends(get_db), current_user: StockMateriaPrimaSchema = Depends(get_current_user)): 
    response = update_materia_prima(user_id, stock_materia_prima_id, schema_stock_materia_prima, db)
    return response

@router.delete("/delete_stock_materia_prima", status_code= status.HTTP_200_OK)
def delete_stock_materia_prima(user_id:int, stock_materia_prima_id:int, db: Session = Depends(get_db), current_user: StockMateriaPrimaSchema = Depends(get_current_user)):
    response = delete_materia_prima(user_id, stock_materia_prima_id, db)
    return response 