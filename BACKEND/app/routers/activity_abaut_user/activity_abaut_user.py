from fastapi import APIRouter, Depends, status
from app.db.database import get_db
from app.schemas.schemas import Schema_activity_abaut_user
from app.repository.activity_abaut_user_repository import create_activity_about
from app.oauth import get_current_user
from sqlalchemy.orm import Session
from typing import List

router = APIRouter(prefix=f"/activity-abaut-user", tags=["activity-abaut-user"])

@router.post("/create_activity_abaut_user", response_model= Schema_activity_abaut_user, status_code= status.HTTP_201_CREATED)
def create_activity_abaut_user(user_id:int, schema: Schema_activity_abaut_user, db: Session = Depends(get_db), current_user: Schema_activity_abaut_user=Depends(get_current_user)):
    response = create_activity_about(user_id, schema, db)
    return response