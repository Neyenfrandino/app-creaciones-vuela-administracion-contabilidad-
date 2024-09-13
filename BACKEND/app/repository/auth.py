from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.db.models import User
from app.hashing import Hash
from app.token import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

def login_user(schema: OAuth2PasswordRequestForm, db: Session):
    try:
        # Buscar el usuario en la base de datos usando el username
        user_true = db.query(User).filter(User.email == schema.username).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        # Verificar la contraseña
        if Hash.verify_password(schema.password, user_true.password): 
            access_token = create_access_token({"username": user_true.email})
            return {"access_token": access_token, "token_type": "bearer"}
        else:
            raise HTTPException(status_code=401, detail="Contraseña incorrecta")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
