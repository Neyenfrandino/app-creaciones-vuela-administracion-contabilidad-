from fastapi import FastAPI
import os
import uvicorn
from app.routers.user import user
from app.routers import auth
from app.routers.products import products
from app.routers.sell_products import sell_products
from app.routers.category_of_products import category_of_products
from app.routers.cost_production import cost_production
from app.routers.stock_materia_prima import stock_materia_prima
from app.routers.products_material import products_material
from fastapi.middleware.cors import CORSMiddleware

# Analytics routers 
from app.routers.analytics.sell_analysis import sell_total_analytics
from app.routers.analytics.cost_analysis import cost_analytics


# from app.db.database import Base, engine 

app = FastAPI()


# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],  # Agrega PATCH a la lista de métodos permitidos,
    allow_headers=["*"],
)

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

# Analytics routers 
app.include_router(sell_total_analytics.router)
app.include_router(cost_analytics.router)



# if __name__ == "__main__":
#    uvicorn.run('main:app', port=8000, reload=True)

if __name__ == "__main__":
    port = int(os.getenv('POSTGRES_PORT'))  # Obtener el puerto desde la variable de entorno, con 8000 como valor por defecto
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)