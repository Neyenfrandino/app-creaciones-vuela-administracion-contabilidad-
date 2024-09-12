# Aqui solo los super usuarios pueden crear, leer, actualizar y borrar las pastillas
from fastapi import HTTPException
from app.db.models import Pills_all, User

def create_pills(user_id, schema_pills, db):
    try:
        # Verifica si el usuario existe
        user_true = db.query(User).filter(User.id == user_id).first()
        if user_true.id != 7 :
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
        # Verifica si el nombre de la pastilla ya existe
        pills_true = db.query(Pills_all).all()
        for pills in pills_true:
            if pills.name_pills == schema_pills.name_pills:
                raise HTTPException(status_code=409, detail="La pastilla ya existe")
        
        print(schema_pills.name_pills)
        print(schema_pills.cant_pills_in_tablet)
        
        # Verifica que el nombre no esté vacío y que la cantidad sea mayor a 0
        if schema_pills.name_pills != '' and schema_pills.cant_pills_in_tablet > 0 and schema_pills.name_pills != 'string':
            # Crea una nueva instancia de Pills_all
            new_pills = Pills_all(**schema_pills.dict())
            db.add(new_pills)
            db.commit()
            db.refresh(new_pills)  # Refresca el objeto para obtener los datos actualizados desde la base de datos
        else:
            raise HTTPException(status_code=400, detail="No se puede crear una pastilla sin nombre o con cantidad igual o menor a cero")
        
        return new_pills  # Devuelve la nueva instancia creada

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def read_pills(user_id, schema, db):
    try:
        # Verificar si el usuario existe
        user_true = db.query(User).filter(User.id == user_id).first()
        if user_true.id != 7 :
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        # Obtener todas las pastillas
        pills_true = db.query(Pills_all).all()
        pills_response = [schema.from_orm(pill) for pill in pills_true]

        return pills_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def update_pills(user_id, id_pills, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()
        if user_true.id != 7 :
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
        pills_true = db.query(Pills_all).filter(Pills_all.id == id_pills).first()
        if pills_true is None:
            raise HTTPException(status_code=404, detail="Pills not found")
        
        # Validar los datos antes de la actualización
        if not schema.name_pills or schema.cant_pills_in_tablet <= 0:
            raise HTTPException(status_code=400, detail="Nombre de la pastilla no puede estar vacío y la cantidad debe ser mayor a 0")
        
        # Actualizar los campos del objeto existente
        pills_true.name_pills = schema.name_pills
        pills_true.description_pills = schema.description_pills
        pills_true.mode_use_pills = schema.mode_use_pills
        pills_true.cant_pills_in_tablet = schema.cant_pills_in_tablet
        
        db.commit()
        db.refresh(pills_true)  # Refresca el objeto para obtener los datos actualizados desde la base de datos
        return schema.from_orm(pills_true)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def delete_pills(user_id, id_pills, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()
        if user_true.id != 7 :
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
        pills_true = db.query(Pills_all).filter(Pills_all.id == id_pills).first()
        if pills_true is None:
            raise HTTPException(status_code=404, detail="Pills not found")
        
        db.delete(pills_true)
        db.commit()
        return {"message": "Pills deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
