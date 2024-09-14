from fastapi import HTTPException
from app.db.models import SellProduct, User, Product

def create_sell_product(user_id, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        product_true = db.query(Product).filter(Product.products_id == schema.products_id).first()

        if product_true is None:
            raise HTTPException(status_code=404, detail="Product not found")

        # Convertir el esquema a un diccionario
        sell_product_dict = schema.dict()
        
        # Asignar el ID del usuario al producto
        sell_product_dict['user_id'] = user_true.id

        # Crear la instancia del modelo Product
        sell_product_true = SellProduct(**sell_product_dict)

        # Agregar el producto a la base de datos
        db.add(sell_product_true)
        db.commit()

        # Devolver el producto como un modelo Pydantic
        return {"message": "SellProduct created successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))


def get_sell_products_all(user_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        sell_products_true = db.query(SellProduct).filter(SellProduct.user_id == user_true.id).all()

        if sell_products_true is None:
            return {"message": "SellProduct not found"}
        
        return sell_products_true
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))


def update_sell_product(user_id, sell_product_id, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        sell_product_true = db.query(SellProduct).filter(SellProduct.sell_product_id == sell_product_id).first()

        if sell_product_true is None:
            raise HTTPException(status_code=404, detail="SellProduct not found")
        
        # Convertir el esquema a un diccionario y asignar el user_id
        sell_product_data = schema.dict()
        sell_product_data['user_id'] = user_true.id

        # Actualizar los atributos del producto actual
        for key, value in sell_product_data.items():
            setattr(sell_product_true, key, value)
        
        db.commit()
        db.refresh(sell_product_true)

        return {"message": "SellProduct updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))
    
def delete_sell_product(user_id, sell_product_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        sell_product_true = db.query(SellProduct).filter(SellProduct.sell_product_id == sell_product_id).first()

        if sell_product_true is None:
            raise HTTPException(status_code=404, detail="SellProduct not found")
        
        db.delete(sell_product_true)
        db.commit()
        return {"message": "SellProduct deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))