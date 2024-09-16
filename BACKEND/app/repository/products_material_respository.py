

from fastapi import HTTPException
from app.db.models import ProductMaterial, User

def create_product_material(user_id, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        

        product_material = ProductMaterial(**schema.dict())
        db.add(product_material)
        db.commit()
        return {"message": "ProductMaterial created successfully"}

    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))
    
def read_product_material(user_id, product_material_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        product_material_true = db.query(ProductMaterial).filter(ProductMaterial.product_material_id == product_material_id).first()

        if product_material_true is None:
            raise HTTPException(status_code=404, detail="ProductMaterial not found")
        
        return product_material_true
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def update_product_material(user_id, product_material_id, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        product_material_true = db.query(ProductMaterial).filter(ProductMaterial.product_material_id == product_material_id).first()

        if product_material_true is None:
            raise HTTPException(status_code=404, detail="ProductMaterial not found")
        
        # Convertir el esquema a un diccionario y asignar el user_id
        product_material_data = schema.dict()
        product_material_data['user_id'] = user_true.id

# Actualizar los atributos del producto actual
        for key, value in product_material_data.items():
            # Asegurarse de que 'value' sea un diccionario para acceder a sus valores
            if isinstance(value, dict) and 'name' in value:
                # Convertir el campo 'name' a minúsculas
                value['name'] = value['name'].lower()

            # Actualizar los atributos del objeto 'product_material_true'
            setattr(product_material_true, key, value)
                
        db.commit()
        db.refresh(product_material_true)

        return {"message": "ProductMaterial updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def delete_product_material(user_id, product_material_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        product_material_true = db.query(ProductMaterial).filter(ProductMaterial.product_material_id == product_material_id).first()

        if product_material_true is None:
            raise HTTPException(status_code=404, detail="ProductMaterial not found")
        
        db.delete(product_material_true)
        db.commit()
        return {"message": "ProductMaterial deleted successfully"}
    except Exception as e:    
        raise HTTPException(status_code=409, detail=str(e))