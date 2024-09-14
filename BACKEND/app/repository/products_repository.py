# from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.db.models import Product, User, CategoryOfProduct


def create_product(user_id, schema, db):
    try:
        # Buscar al usuario en la base de datos
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")

        # Buscar la categoría en la base de datos
        category_true = db.query(CategoryOfProduct).filter(CategoryOfProduct.category_products_id == schema.category_of_products_id).first()

        if category_true is None:
            raise HTTPException(status_code=404, detail="Category not found")

        # Convertir el esquema a un diccionario
        product_dict = schema.dict()
        
        # Asignar el ID del usuario al producto
        product_dict['user_id'] = user_true.id

        # Crear la instancia del modelo Product
        product_true = Product(**product_dict)

        # Agregar el producto a la base de datos
        db.add(product_true)
        db.commit()

        # Devolver el producto como un modelo Pydantic
        return {"message": "Product created successfully"}

    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def read_product(user_id, product_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")

        product_true = db.query(Product).filter(Product.products_id == product_id).first()

        if product_true is None:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return product_true
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def update_product(user_id, product_id, schema, db):
    try:
        # Verificar si el usuario existe
        user_true = db.query(User).filter(User.id == user_id).first()
        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")

        # Verificar si el producto existe
        product_true = db.query(Product).filter(Product.products_id == product_id).first()
        if product_true is None:
            raise HTTPException(status_code=404, detail="Product not found")

        # Convertir el esquema a un diccionario y asignar el user_id
        product_data = schema.dict()
        product_data['user_id'] = user_true.id

        # Actualizar los atributos del producto actual
        for key, value in product_data.items():
            setattr(product_true, key, value)

        # Confirmar cambios en la base de datos
        db.commit()
        db.refresh(product_true)

        return {"message": "Product updated successfully"}
    except Exception as e:
        db.rollback()  # Revertir la transacción en caso de error
        raise HTTPException(status_code=409, detail=str(e))

def delete_product(user_id, product_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        product_true = db.query(Product).filter(Product.products_id == product_id).first()

        if product_true is None:
            raise HTTPException(status_code=404, detail="Product not found")
        
        db.delete(product_true)
        db.commit()
        return {"message": "Product deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))