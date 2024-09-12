from fastapi import HTTPException
from app.db.models import Info_user_about_activity, User


def create_activity_about(user_id, schema_activity_abaut_user, db):
    try:
        # Verifica si el usuario existe
        user_true = db.query(User).filter(User.id == user_id).first()
        
        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Crea una nueva instancia de Activity_abaut_user
        new_activity_abaut_user = Info_user_about_activity(**schema_activity_abaut_user.dict())
        
        db.add(new_activity_abaut_user)
        db.commit()
        db.refresh(new_activity_abaut_user)  # Refresca la instancia con los datos actualizados
        
        # Retorna el esquema del nuevo activity_abaut_user
        return schema_activity_abaut_user.from_orm(new_activity_abaut_user)

    except HTTPException as http_err:
        raise http_err  # Re-lanza HTTPException sin cambios

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))