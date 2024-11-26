# Este archivo se encarga de cargar las variables de entorno y de crear una clase con las variables de entorno
import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

# Con este print se imprime la configuración de las variables de entorno para depuraciones y verificación
# print(os.getenv('POSTGRES_USER'), os.getenv('POSTGRES_PASSWORD'), os.getenv('POSTGRES_DB'), os.getenv('POSTGRES_SERVER'), os.getenv('POSTGRES_PORT'))

# class Settings:
#     PROJECTS_NAME : str = "evely-app"
#     PROJECT_VERSION : str = "4.0.0"
#     POSTGRES_USER = os.getenv('POSTGRES_USER')
#     POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
#     POSTGRES_DB = os.getenv('POSTGRES_DB')
#     POSTGRES_SERVER = os.getenv('POSTGRES_SERVER')
#     POSTGRES_PORT = os.getenv('POSTGRES_PORT')

#     DATA_BASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

# settings = Settings()

import os

class Settings:
    def __init__(self):
        self.PROJECT_NAME = "evely-app"
        self.PROJECT_VERSION = "4.0.0"

        # Cargar las variables de entorno
        self.POSTGRES_USER = os.getenv('POSTGRES_USER')  # Creación del usuario
        self.POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')  # Contraseña
        self.POSTGRES_DB = os.getenv('POSTGRES_DB')  # Nombre de la base de datos
        self.POSTGRES_HOST = os.getenv('POSTGRES_HOST')  # Dirección del servidor de base de datos
        self.POSTGRES_PORT = os.getenv('POSTGRES_PORT')  # Puerto de la base de datos

        # Construir la URL de conexión con las credenciales y host correctos
        self.DATA_BASE_URL = f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

# Crear la instancia de Settings
settings = Settings()

# Ejemplo de uso
print(settings.DATA_BASE_URL)
