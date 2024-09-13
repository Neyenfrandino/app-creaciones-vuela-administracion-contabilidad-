from fastapi import FastAPI
import uvicorn
from app.routers.user import user
from app.routers import auth
from app.routers.products import products
# from app.db.database import Base, engine 

app = FastAPI()

# def create_tables():
#     Base.metadata.create_all(bind=engine)

# create_tables()

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(products.router)


if __name__ == "__main__":
   uvicorn.run('main:app', port=8000, reload=True)
