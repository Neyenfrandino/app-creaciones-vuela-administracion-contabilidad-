from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status
from app.db.database import get_db
from app.repository.data_repositories.cost_analytics_repository import profit_margin_analytics

router = APIRouter(prefix=f"/cost_analytics", tags=["cost_analytics"])

@router.get("/profit_margin_analytics", status_code= status.HTTP_200_OK)
def get_cost_analytics(user_id:int, db: Session = Depends(get_db)):
    response = profit_margin_analytics(user_id, db)
    return response