from fastapi import Depends, HTTPException
from sqlalchemy import func

from app.db.models import User, Product, SellProduct

def get_sell_analytics(user_id, db):
    user_true = db.query(User).filter(User.id == user_id).first()

    if user_true is None:
        raise HTTPException(status_code=404, detail="No existe el usuario")
    
    filter_user_db_sell = (
        db.query(
            SellProduct.products_id,
            func.sum(SellProduct.quantity_sell).label("total_quantity"),
            func.sum(SellProduct.price_unit * SellProduct.quantity_sell).label("total_revenue"),
            Product.name_product
        )
        .join(Product, Product.products_id == SellProduct.products_id)
        .filter(SellProduct.user_id == user_id)
        .group_by(SellProduct.products_id, Product.name_product)
        .order_by(func.sum(SellProduct.quantity_sell).desc())
        .all()
    )

    # Convertir los resultados en una lista de diccionarios
    sell_analytics = []
    for products_id, total_quantity, total_revenue, name_product in filter_user_db_sell:
        sell_analytics.append({
            "products_id": products_id,
            "name_product": name_product,
            "total_quantity": total_quantity,
            "total_revenue": total_revenue
        })

    return sell_analytics


def total_revenue(user_id, db):
    user_true = db.query(User).filter(User.id == user_id).first()

    if user_true is None:
        raise HTTPException(status_code=404, detail="No existe el usuario")
    
    filter_user_db_sell = db.query(SellProduct).filter(SellProduct.user_id == user_id).all()
                        
    
    total_revenue = 0

    for sell_product in filter_user_db_sell:
        total_revenue += sell_product.price_unit * sell_product.quantity_sell
    
    print(total_revenue)
    

