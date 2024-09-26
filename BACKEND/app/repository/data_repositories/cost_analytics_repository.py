from sqlalchemy import extract, func
from fastapi import HTTPException

from app.db.models import User, Product, SellProduct

# Función para obtener el margen de beneficios por producto de un usuario
def profit_margin_analytics(user_id, db):
    user_true = db.query(User).filter(User.id == user_id).first()

    if user_true is None:
        raise HTTPException(status_code=404, detail="No existe el usuario")
    
    filter_user_db_product = (
        db.query(
            Product,  # Incluimos el modelo en el query
            (Product.price_sell_client_final - Product.price_production).label("profit_margin")  # Cálculo de la ganancia
        )
        .filter(Product.user_id == user_id).all()
    )

    # Convertir los resultados en una lista de diccionarios
    profit_analytics = []
    for product, profit_margin in filter_user_db_product:
        profit_analytics.append({
            "products_id": product.products_id,
            "name_product": product.name_product,
            "price_sell_client_final": product.price_sell_client_final,
            "price_production": product.price_production,
            "profit_margin": profit_margin
        })
   
    return profit_analytics