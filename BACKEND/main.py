from fastapi import FastAPI
import uvicorn
from app.routers.user import user
from app.routers import auth
from app.routers.products import products
from app.routers.sell_products import sell_products
from app.routers.category_of_products import category_of_products
from app.routers.cost_production import cost_production
from app.routers.stock_materia_prima import stock_materia_prima
from app.routers.products_material import products_material
# from app.db.database import Base, engine 

app = FastAPI()

# def create_tables():
#     Base.metadata.create_all(bind=engine)

# create_tables()

app.include_router(auth.router)

app.include_router(user.router)
app.include_router(products.router)
app.include_router(sell_products.router)
app.include_router(category_of_products.router)
app.include_router(cost_production.router)
app.include_router(stock_materia_prima.router)
app.include_router(products_material.router)


if __name__ == "__main__":
   uvicorn.run('main:app', port=8000, reload=True)
