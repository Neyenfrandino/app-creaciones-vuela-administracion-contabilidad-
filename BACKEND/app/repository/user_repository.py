# Aqui van a ir todas las funciones que se necesiten para el backend
from fastapi import HTTPException
from app.hashing import Hash 

from app.db.models import User


def create_user(schema, db):
    try:
        schema.password = Hash.hash_password(schema.password)
        user_dict = dict(schema)
        
        user_true = db.query(User).filter(User.email == user_dict["email"]).first()

        if user_true is None:
            user = User(**user_dict)
            db.add(user)
            db.commit()
            return schema.from_orm(user) 
        else:
            return {"message": "User already exists"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def read_users(user_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            return {"message": "User not found"}
        
        return user_true
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_user(user_id, schema, db):
    try:
        user_dict = dict(schema)
        user_true = db.query(User).filter(User.id == user_id).first()

        
        if user_true is None:
            return {"message": "User not found"}
        else:
            for key, value in user_dict.items():
                if value != 'string' and value != '' : 
                    setattr(user_true, key, value)

            db.add(user_true)
            db.commit()
            return {"message": "User updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def delete_user(user_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()
        if user_true is None:
            return {"message": "User not found"}
        else:
            db.delete(user_true)
            db.commit()
            return {"message": "User deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))