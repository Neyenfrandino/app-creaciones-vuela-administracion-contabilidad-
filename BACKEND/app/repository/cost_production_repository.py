from fastapi import HTTPException
from app.db.models import User, CostProduction, StockMateriaPrima

def cost_production_create(user_id, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        stock_materia_prima_true = db.query(StockMateriaPrima).filter(StockMateriaPrima.stock_materia_prima_id == schema.stock_materia_prima_id).first()

        if stock_materia_prima_true is None:
            raise HTTPException(status_code=404, detail="StockMateriaPrima not found")
        

        cost_production = CostProduction(**schema.dict())
        db.add(cost_production)
        db.commit()
    
        return {"message": "CostProduction created successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))
    

def cost_production_get_all(user_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        cost_productions_true = db.query(CostProduction).all()

        if cost_productions_true is None:
            return {"message": "CostProduction not found"}
        
        return cost_productions_true
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def cost_production_update(user_id, cost_production_id, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        cost_production_true = db.query(CostProduction).filter(CostProduction.cost_production_id == cost_production_id).first()

        if cost_production_true is None:
            raise HTTPException(status_code=404, detail="CostProduction not found")
        
        # Convertir el esquema a un diccionario y asignar el user_id
        cost_production_data = schema.dict()
        cost_production_data['user_id'] = user_true.id

        # Actualizar los atributos del producto actual
        for key, value in cost_production_data.items():
            setattr(cost_production_true, key, value)
        
        db.commit()
        db.refresh(cost_production_true)

        return {"message": "CostProduction updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def cost_production_delete(user_id, cost_production_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        cost_production_true = db.query(CostProduction).filter(CostProduction.cost_production_id == cost_production_id).first()

        if cost_production_true is None:
            raise HTTPException(status_code=404, detail="CostProduction not found")
        
        db.delete(cost_production_true)
        db.commit()
        return {"message": "CostProduction deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))
