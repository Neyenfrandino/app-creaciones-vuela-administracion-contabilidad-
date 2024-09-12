# Este archivo se encarga de cargar las variables de entorno y de crear una clase con las variables de entorno
import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

# Con este print se imprime la configuración de las variables de entorno para depuraciones y verificación
# print(os.getenv('POSTGRES_USER'), os.getenv('POSTGRES_PASSWORD'), os.getenv('POSTGRES_DB'), os.getenv('POSTGRES_SERVER'), os.getenv('POSTGRES_PORT'))

class Settings:
    PROJECTS_NAME : str = "evely-app"
    PROJECT_VERSION : str = "4.0.0"
    POSTGRES_USER = os.getenv('POSTGRES_USER')
    POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
    POSTGRES_DB = os.getenv('POSTGRES_DB')
    POSTGRES_SERVER = os.getenv('POSTGRES_SERVER')
    POSTGRES_PORT = os.getenv('POSTGRES_PORT')

    DATA_BASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

settings = Settings()