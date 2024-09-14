from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status
from app.schemas.schemas import CostProductionSchema
from app.db.database import get_db

from app.repository.cost_production_repository import cost_production_create, cost_production_get_all, cost_production_update, cost_production_delete

from app.oauth import get_current_user

router = APIRouter(prefix=f"/cost_production", tags=["cost_production"])
@router.post("/create_cost_production", status_code= status.HTTP_201_CREATED)
def create_cost_production(user_id:int, schema_cost_production: CostProductionSchema, db: Session = Depends(get_db), get_current_user: CostProductionSchema = Depends(get_current_user)):
    response = cost_production_create(user_id, schema_cost_production, db)
    return response

@router.get("/get_all_cost_production", status_code= status.HTTP_200_OK)
def get_all_cost_production(user_id:int, db: Session = Depends(get_db), get_current_user: CostProductionSchema = Depends(get_current_user) ):
    response = cost_production_get_all(user_id, db)
    return response

@router.patch("/update_cost_production", status_code= status.HTTP_200_OK)
def update_cost_production(user_id:int, cost_production_id:int, schema_cost_production: CostProductionSchema, db: Session = Depends(get_db), get_current_user: CostProductionSchema = Depends(get_current_user) ):
    response = cost_production_update(user_id, cost_production_id, schema_cost_production, db)
    return response

@router.delete("/delete_cost_production", status_code= status.HTTP_200_OK)
def delete_cost_production(user_id:int, cost_production_id:int, db: Session = Depends(get_db), get_current_user: CostProductionSchema = Depends(get_current_user) ):
    response = cost_production_delete(user_id, cost_production_id, db)
    return response