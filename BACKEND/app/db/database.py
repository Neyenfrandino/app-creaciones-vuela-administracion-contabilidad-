from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from core.config import settings

SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL

engine = create_engine(SQLALCHEMY_DATABASE_URL)
Sessionmaker = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Esto se encarga de abrir la base de datos cuando la estamos usando y de cerrarla cuando terminamos
def get_db():
    db = Sessionmaker()
    try:
        yield db
    finally:
        db.close()

try:
    with engine.connect() as connection:
        print(f"Conexión exitosa a la base de datos {engine.url}")	
except Exception as e:
    print(f"Error al conectar a la base de datos: {e}")
