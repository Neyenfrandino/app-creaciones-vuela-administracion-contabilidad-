from fastapi import HTTPException
from app.db.models import User, CategoryOfProduct

def create_category(user_id, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        name_category = schema.name_category.lower()
        
        category_of_products_true = db.query(CategoryOfProduct).filter(CategoryOfProduct.name_category == name_category).first()

        if category_of_products_true is None:
            category_of_products = CategoryOfProduct(**schema.dict())
            db.add(category_of_products)
            db.commit()
            return {"message": "CategoryOfProduct created successfully"}
        else:
            return {"message": "CategoryOfProduct already exists"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def get_category_all(user_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        category_of_products_true = db.query(CategoryOfProduct).all()

        if category_of_products_true is None:
            return {"message": "CategoryOfProduct not found"}
        
        return category_of_products_true
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

def update_category(user_id, category_of_products_id, schema, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        category_of_products_true = db.query(CategoryOfProduct).filter(CategoryOfProduct.category_products_id == category_of_products_id).first()

        if category_of_products_true is None:
            raise HTTPException(status_code=404, detail="CategoryOfProduct not found")
        
        # Convertir el esquema a un diccionario y asignar el user_id
        category_of_products_data = schema.dict()
        category_of_products_data['user_id'] = user_true.id

        # Actualizar los atributos del producto actual
        for key, value in category_of_products_data.items():
            value_lower = value.lower()
            setattr(category_of_products_true, key, value_lower)
        
        db.commit()
        db.refresh(category_of_products_true)

        return {"message": "CategoryOfProduct updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))


def delete_category(user_id, category_of_products_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        category_of_products_true = db.query(CategoryOfProduct).filter(CategoryOfProduct.category_products_id == category_of_products_id).first()

        if category_of_products_true is None:
            raise HTTPException(status_code=404, detail="CategoryOfProduct not found")
        
        db.delete(category_of_products_true)
        db.commit()
        return {"message": "CategoryOfProduct deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))