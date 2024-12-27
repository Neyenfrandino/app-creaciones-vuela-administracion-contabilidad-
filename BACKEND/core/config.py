# Este archivo se encarga de cargar las variables de entorno y de crear una clase con las variables de entorno
# import os
# from dotenv import load_dotenv
# from pathlib import Path

# env_path = Path('.') / '.env'
# load_dotenv(dotenv_path=env_path)

# # Con este print se imprime la configuración de las variables de entorno para depuraciones y verificación
# print(os.getenv('POSTGRES_USER'), os.getenv('POSTGRES_PASSWORD'), os.getenv('POSTGRES_DB'), os.getenv('POSTGRES_SERVER'), os.getenv('POSTGRES_PORT'))

# class Settings:
#     PROJECTS_NAME : str = "evely-app"
#     PROJECT_VERSION : str = "4.0.0"
#     POSTGRES_USER = os.getenv('POSTGRES_USER')
#     POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
#     POSTGRES_DB = os.getenv('POSTGRES_DB')
#     POSTGRES_SERVER = os.getenv('POSTGRES_SERVER')
#     POSTGRES_PORT = os.getenv('POSTGRES_PORT')

#     DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

# settings = Settings()


import os
from dotenv import load_dotenv
from pathlib import Path

# Cargar las variables de entorno desde el archivo .env
env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

# Verificar si las variables de entorno se cargaron correctamente
print("POSTGRES_USER:", os.getenv('POSTGRES_USER'))
print("POSTGRES_PASSWORD:", os.getenv('POSTGRES_PASSWORD'))
print("POSTGRES_DB:", os.getenv('POSTGRES_DB'))
print("POSTGRES_HOST:", os.getenv('POSTGRES_HOST'))
print("POSTGRES_PORT:", os.getenv('POSTGRES_PORT'))

# Clase de configuración
class Settings:
    PROJECT_NAME = "creaciones_vuela_db"
    PROJECT_VERSION = "4.0.0"

    # Cargar las variables de entorno
    POSTGRES_USER = os.getenv('POSTGRES_USER')
    POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
    POSTGRES_DB = os.getenv('POSTGRES_DB')
    POSTGRES_HOST = os.getenv('POSTGRES_HOST')  # Dirección del servidor de base de datos
    POSTGRES_PORT = os.getenv('POSTGRES_PORT')  # Puerto de la base de datos

    # Construir la URL de conexión con las credenciales y host correctos
    DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}?sslmode=require"
    # DATABASE_URL = "postgresql://creaciones_vuela_db:dpg-ctnabr3qf0us73aes1p0-a:5432/creaciones_vuela_db?sslmode=require"

# Crear la instancia de Settings
settings = Settings()

# Ejemplo de uso
print("DATABASE_URL:", settings.DATABASE_URL)
