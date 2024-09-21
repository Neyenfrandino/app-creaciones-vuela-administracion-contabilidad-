from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status

from app.schemas.schemas import Schema_user
from app.db.database import get_db
from app.repository.data_repositories.sell_analytics_repository import get_sell_analytics, total_revenue
from app.oauth import get_current_user

router = APIRouter(prefix=f"/sell_total_analytics", tags=["sell_total_analytics"]) 


@router.get("/get_sell_total_analytics", status_code= status.HTTP_200_OK)
def get_sell_total_analytics(user_id:int, db: Session = Depends(get_db), current_user: Schema_user = Depends(get_current_user)):
    response = get_sell_analytics(user_id, db)
    return response


@router.get("/get_total_revenue", status_code= status.HTTP_200_OK)
def get_total_revenue(user_id:int, db: Session = Depends(get_db), current_user: Schema_user = Depends(get_current_user)):
    response = total_revenue(user_id, db)
    return response