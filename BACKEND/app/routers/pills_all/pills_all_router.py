from fastapi import APIRouter, Depends, status
from app.db.database import get_db
from app.schemas.schemas import Schema_pills
from app.repository.pills_all_repository import create_pills, read_pills, update_pills, delete_pills
from app.oauth import get_current_user
from sqlalchemy.orm import Session
from typing import List

router = APIRouter(prefix=f"/pills-all", tags=["pills-all"])

@router.post("/create_pills", response_model= Schema_pills, status_code= status.HTTP_201_CREATED)
def create_pills_all(user_id:int, schema_pills: Schema_pills, db: Session = Depends(get_db), current_user: Schema_pills=Depends(get_current_user)):
    response = create_pills(user_id, schema_pills, db)
    return response

@router.get("/read_pills_all", response_model=List[Schema_pills], status_code=status.HTTP_200_OK)
def read_pills_all(user_id: int, db: Session = Depends(get_db), current_user: Schema_pills = Depends(get_current_user)):
    response = read_pills(user_id, Schema_pills, db)
    return response

@router.patch("/update_pills_all", response_model=Schema_pills, status_code=status.HTTP_200_OK)
def update_pills_all(user_id: int, id_pills: int, schema_pills: Schema_pills, db: Session = Depends(get_db), current_user: Schema_pills = Depends(get_current_user)):
    response = update_pills(user_id, id_pills, schema_pills, db)
    return response

@router.delete("/delete_pills_all", status_code=status.HTTP_200_OK)
def delete_pills_all(user_id: int, id_pills: int, db: Session = Depends(get_db), current_user: Schema_pills = Depends(get_current_user)):
    response = delete_pills(user_id, id_pills, db)
    return response