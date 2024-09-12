from fastapi import FastAPI
import uvicorn
from app.routers.user import user
from app.routers.pills_all import pills_all_router
from app.routers.activity_abaut_user import activity_abaut_user
from app.routers import auth
# from app.db.database import Base, engine 

app = FastAPI()

# def create_tables():
#     Base.metadata.create_all(bind=engine)

# create_tables()

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(pills_all_router.router)
app.include_router(activity_abaut_user.router)


if __name__ == "__main__":
   uvicorn.run('main:app', port=8000, reload=True)
