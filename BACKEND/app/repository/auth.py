from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends
from app.db.models import User
from app.hashing import Hash
from app.token import create_access_token
from app.db.database import get_db
from fastapi.security import OAuth2PasswordRequestForm

def login_user(schema:OAuth2PasswordRequestForm , db: Session = Depends(get_db)):
    if not schema.username or not schema.password:
        raise HTTPException(status_code=400, detail="Email y contraseña son requeridos")

    user_true = db.query(User).filter(User.email == schema.username).first()

    if user_true is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if not Hash.verify_password(schema.password, user_true.password): 
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    access_token = create_access_token({"username": user_true.email})
    return {"access_token": access_token, "token_type": "bearer"}
