
from fastapi import HTTPException
from app.db.models import StockMateriaPrima, User

def create_materia_prima(user_id, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        name = schema.name.lower()
        
        materia_prima_true = db.query(StockMateriaPrima).filter(StockMateriaPrima.name == name).first()

        if materia_prima_true is None:
            materia_prima = StockMateriaPrima(**schema.dict())
            db.add(materia_prima)
            db.commit()
            return {"message": "StockMateriaPrima created successfully"}
        else:
            return {"message": "StockMateriaPrima already exists"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def get_materia_prima_all(user_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        materia_prima_true = db.query(StockMateriaPrima).all()

        if materia_prima_true is None:
            return {"message": "StockMateriaPrima not found"}
        
        return materia_prima_true
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))
    
def update_materia_prima(user_id, stock_materia_prima_id, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        stock_materia_prima_true = db.query(StockMateriaPrima).filter(StockMateriaPrima.stock_materia_prima_id == stock_materia_prima_id).first()

        if stock_materia_prima_true is None:
            raise HTTPException(status_code=404, detail="StockMateriaPrima not found")
        
        # Convertir el esquema a un diccionario y asignar el user_id
        stock_materia_prima_data = schema.dict()
        stock_materia_prima_data['user_id'] = user_true.id

# Actualizar los atributos del producto actual
        for key, value in stock_materia_prima_data.items():
            # Asegurarse de que 'value' sea un diccionario para acceder a sus valores
            if isinstance(value, dict) and 'name' in value:
                # Convertir el campo 'name' a minúsculas
                value['name'] = value['name'].lower()

            # Actualizar los atributos del objeto 'stock_materia_prima_true'
            setattr(stock_materia_prima_true, key, value)
                
        db.commit()
        db.refresh(stock_materia_prima_true)

        return {"message": "StockMateriaPrima updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def delete_materia_prima(user_id, stock_materia_prima_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        stock_materia_prima_true = db.query(StockMateriaPrima).filter(StockMateriaPrima.stock_materia_prima_id == stock_materia_prima_id).first()

        if stock_materia_prima_true is None:
            raise HTTPException(status_code=404, detail="StockMateriaPrima not found")
        
        db.delete(stock_materia_prima_true)
        db.commit()
        return {"message": "StockMateriaPrima deleted successfully"}
    except Exception as e:    
        raise HTTPException(status_code=409, detail=str(e))