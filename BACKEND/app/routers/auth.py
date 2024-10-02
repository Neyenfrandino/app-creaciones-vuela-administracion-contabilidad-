from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.schemas import Token
from app.db.database import get_db
from app.repository.auth import login_user

router = APIRouter(prefix="/login", tags=["login"])

@router.post("/", response_model=Token, status_code=status.HTTP_200_OK)
def login_users(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    auth_token = login_user(form_data, db)
    print(auth_token)
    return auth_token
