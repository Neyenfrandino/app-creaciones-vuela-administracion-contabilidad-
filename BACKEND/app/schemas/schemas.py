# Aqui van a ir todas las clases de pydantic que se necesiten para el backend
from pydantic import BaseModel
from datetime import datetime, date
from typing import Union, Optional


class Schema_user(BaseModel):  # Cambiado el nombre de la clase a PascalCase
    name: str
    email: str
    password: str
   
 
    class Config:
        # orm_mode = True  # Permite crear instancias desde objetos ORM (como los de SQLAlchemy)
        from_attributes = True # Permite usar from_orm para crear instancias desde atributos de objetos ORM

class Schema_user_login(BaseModel):
    email: str
    password: str
    class Config:
        orm_mode = True  # Permite crear instancias desde objetos ORM (como los de SQLAlchemy)
        from_attributes = True # Permite usar from_orm para crear instancias desde atributos de objetos ORM


class ProductSchema(BaseModel):
    user_id: int
    category_of_products_id: int
    name_product: str
    description_product: Optional[str] = None
    price_production: Optional[float] = None
    price_sell_client_final: Optional[float] = None
    current_stock: Optional[int] = None
    image_url: Optional[str] = None

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str

class Token_data(BaseModel):
    username: Union[str, None] = None
