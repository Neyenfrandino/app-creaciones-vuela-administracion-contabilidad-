
from sqlalchemy import extract, func
from fastapi import HTTPException

from app.db.models import User, Product, SellProduct
# detalles de ventas por producto de un usuario, esto nos devuelve la cantidad de ventas, el total de ventas y el total de ventas por unidad
def get_sell_total_X_products(user_id, db):
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


def get_total_sell_revenue(user_id, db):
    user_true = db.query(User).filter(User.id == user_id).first()

    if user_true is None:
        raise HTTPException(status_code=404, detail="No existe el usuario")
    
    filter_user_db_sell = db.query(SellProduct).filter(SellProduct.user_id == user_id).all()
                        
    print(len(filter_user_db_sell), 'hola mundo')
    total_revenue = 0

    for sell_product in filter_user_db_sell:
        total_revenue += sell_product.price_unit * sell_product.quantity_sell

        data_product ={
            "total_revenue": total_revenue,
            'cant_sell_total': len(filter_user_db_sell)
        }
    
    return data_product
    

def trend_analysis(user_id, db):
    # Verificar si el usuario existe
    user_true = db.query(User).filter(User.id == user_id).first()
    if user_true is None:
        raise HTTPException(status_code=404, detail="No existe el usuario")
    
    # Agrupar por mes y año, contando el número de ventas
    trend_data = (
        db.query(
            extract('month', SellProduct.date_sell).label('month'),
            extract('year', SellProduct.date_sell).label('year'),
            func.count(SellProduct.sell_product_id).label('total_sales')
        )
        .filter(SellProduct.user_id == user_id)
        .group_by('year', 'month')
        .order_by('year', 'month')
        .all()
    )

    # Formatear el resultado
    sell_analytics_ = [
        {"month": month, "year": year, "total_sales": total_sales}
        for month, year, total_sales in trend_data
    ]
    

    return sell_analytics_


def get_treds_analytics_month(user_id, db):
    # Verificar si el usuario existe
    user_true = db.query(User).filter(User.id == user_id).first()
    if user_true is None:
        raise HTTPException(status_code=404, detail="No existe el usuario")
    
    # Agrupar por mes, contando el número de ventas y ordenando por total de ventas (descendente)
    trend_data = (
        db.query(
            extract('month', SellProduct.date_sell).label('month'),
            func.count(SellProduct.sell_product_id).label('total_sales')
        )
        .filter(SellProduct.user_id == user_id)
        .group_by('month')
        .order_by(func.count(SellProduct.sell_product_id).desc())  # Ordenar por ventas descendente
        .limit(5)  # Limitar a los 5 meses con más ventas
        .all()
    )

    # Formatear el resultado
    sell_analytics_ = [
        {"month": month, "total_sales": total_sales}
        for month, total_sales in trend_data
    ]
    
    return sell_analytics_
