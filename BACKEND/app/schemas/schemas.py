# Aqui van a ir todas las clases de pydantic que se necesiten para el backend
from pydantic import BaseModel
from datetime import datetime, date
from typing import Union, Optional

class create_user_schema(BaseModel): 
    name: str
    email: str
    password: str
    class Config:
        orm_mode = True
        from_attributes = True

class Schema_user(BaseModel):  # Cambiado el nombre de la clase a PascalCase
    name: str
    lastname: Optional[str] = None  # Puede ser None
    username: Optional[str] = None  # Puede ser None
    email: str  # Obligatorio
    password: str
    phone: Optional[str] = None  # Puede ser None
    address: Optional[str] = None  # Puede ser None
    city: Optional[str] = None  # Puede ser None
    photo: Optional[str] = None  # Puede ser None
   
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


class SellProductSchema(BaseModel):
    user_id: int
    products_id: int
    date_sell: date
    quantity_sell: int
    price_unit: float
    paid: bool
    payment_method: str

    class Config:
        orm_mode = True



class CategoryOfProductSchema(BaseModel):
    name_category: str
    description: Optional[str] = None

    class Config:
        orm_mode = True


class CostProductionSchema(BaseModel):
    cost_production_id: int
    products_id: int
    total_cost: float  # Añadir el campo `total_cost` si es relevante para el cálculo y la actualización
    
    class Config:
        orm_mode = True
        
class StockMateriaPrimaSchema(BaseModel):
    name: str
    description: Optional[str] = None
    quantity: float
    current_date: date
    precio_compra: float

    class Config:
        orm_mode = True 

class ProductMaterialSchema(BaseModel):
    products_id: int
    stock_materia_prima_id: int  # Asegúrate de que este atributo esté presente
    quantity_used: float
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int


class Token_data(BaseModel):
    username: Union[str, None] = None
