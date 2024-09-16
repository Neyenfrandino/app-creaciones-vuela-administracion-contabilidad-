from sqlalchemy import Column, Integer, String, Date, ForeignKey, Float, Boolean, DECIMAL
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False) 
    email = Column(String, unique=True, index=True, nullable=False) 
    password = Column(String, nullable=True)

    # Relación con Product y SellProduct con cascada
    products = relationship("Product", back_populates="user", cascade="all, delete-orphan")
    sell_products = relationship("SellProduct", back_populates="user", cascade="all, delete-orphan")


class Product(Base):
    __tablename__ = "products"

    products_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    category_of_products_id = Column(Integer, ForeignKey("category_of_products.category_products_id", ondelete="CASCADE"), nullable=False)
    name_product = Column(String(255), nullable=False)
    description_product = Column(String(255))
    price_production = Column(Float)
    price_sell_client_final = Column(Float)
    current_stock = Column(Integer)
    image_url = Column(String(255))

    # Relaciones inversas
    user = relationship("User", back_populates="products")
    category = relationship("CategoryOfProduct", back_populates="products")
    sell_products = relationship("SellProduct", back_populates="product", cascade="all, delete-orphan")
    cost_productions = relationship("CostProduction", back_populates="product", cascade="all, delete-orphan")
    product_materials = relationship("ProductMaterial", back_populates="product", cascade="all, delete-orphan")


class SellProduct(Base):
    __tablename__ = "sell_products"

    sell_product_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    products_id = Column(Integer, ForeignKey("products.products_id", ondelete="CASCADE"), nullable=False)
    date_sell = Column(Date, nullable=False)
    quantity_sell = Column(Integer, nullable=False)
    price_unit = Column(Float, nullable=False)
    paid = Column(Boolean, nullable=False)
    payment_method = Column(String(255), nullable=False)

    # Relaciones inversas
    user = relationship("User", back_populates="sell_products")
    product = relationship("Product", back_populates="sell_products")


class CategoryOfProduct(Base):
    __tablename__ = "category_of_products"

    category_products_id = Column(Integer, primary_key=True)
    name_category = Column(String(255), nullable=False)
    description = Column(String(255))

    # Relación con Product
    products = relationship("Product", back_populates="category")


class CostProduction(Base):
    __tablename__ = "cost_production"

    cost_production_id = Column(Integer, primary_key=True)
    products_id = Column(Integer, ForeignKey("products.products_id", ondelete="CASCADE"), nullable=False)
    product_material_id = Column(Integer, ForeignKey("product_material.id"), nullable=False)  
    cant_materia_prima = Column(DECIMAL(10, 2), nullable=False)

    # Relaciones inversas
    product = relationship("Product", back_populates="cost_productions")
    product_material = relationship("ProductMaterial", back_populates="cost_productions")


class StockMateriaPrima(Base):
    __tablename__ = "stock_materia_prima"

    stock_materia_prima_id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    quantity = Column(DECIMAL(10, 2), nullable=False)
    current_date = Column(Date, nullable=False)
    precio_compra = Column(Float, nullable=False)

    # Relación con la tabla intermedia ProductMaterial
    product_materials = relationship("ProductMaterial", back_populates="stock_materia_prima")


class ProductMaterial(Base):
    __tablename__ = "product_material"

    id = Column(Integer, primary_key=True)
    products_id = Column(Integer, ForeignKey("products.products_id"), nullable=False)
    stock_materia_prima_id = Column(Integer, ForeignKey("stock_materia_prima.stock_materia_prima_id"), nullable=False)

    # Relaciones inversas
    product = relationship("Product", back_populates="product_materials")
    stock_materia_prima = relationship("StockMateriaPrima", back_populates="product_materials")
    cost_productions = relationship("CostProduction", back_populates="product_material")
 