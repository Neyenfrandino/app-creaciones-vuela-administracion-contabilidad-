from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status

from app.schemas.schemas import Schema_user
from app.db.database import get_db
from app.repository.data_repositories.sell_analytics_repository import get_sell_total_X_products, get_total_sell_revenue, trend_analysis, get_treds_analytics_month
from app.oauth import get_current_user

router = APIRouter(prefix=f"/analytics_sell", tags=["sell_total_analytics"]) 


@router.get("/get_sell_total_X_products", status_code= status.HTTP_200_OK)
def get_sell_analytics(user_id:int, db: Session = Depends(get_db), current_user: Schema_user = Depends(get_current_user)):
    response = get_sell_total_X_products(user_id, db)
    return response


@router.get("/get_total_sell_revenue", status_code= status.HTTP_200_OK)
def get_sell_analytics_revenue(user_id:int, db: Session = Depends(get_db), current_user: Schema_user = Depends(get_current_user)):
    response = get_total_sell_revenue(user_id, db)
    return response

@router.get("/trend_analysis_date", status_code= status.HTTP_200_OK)
def trend_analysis_date(user_id:int, db: Session = Depends(get_db), current_user: Schema_user = Depends(get_current_user)):
    response = trend_analysis(user_id, db)
    return response

@router.get("/trend_analysis_month", status_code= status.HTTP_200_OK)
def trend_analysis_month(user_id:int, db: Session = Depends(get_db), current_user: Schema_user = Depends(get_current_user)):
    response = get_treds_analytics_month(user_id, db)
    return response