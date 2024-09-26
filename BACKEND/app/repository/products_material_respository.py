from fastapi import HTTPException
from app.db.models import ProductMaterial, User, StockMateriaPrima, CostProduction, Product

from sqlalchemy.orm import aliased
from fastapi import HTTPException
from decimal import Decimal


def create_product_material(user_id, schema, db):
    try:
        # Verificar si el usuario existe
        user_true = db.query(User).filter(User.id == user_id).first()
        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")

        # Validar el esquema antes de crear el objeto
        if schema is None:
            raise HTTPException(status_code=400, detail="ProductMaterial schema is required")
        
        # Crear y agregar el nuevo ProductMaterial
        product_material = ProductMaterial(**schema.dict())

        # Buscar el stock de materia prima en la base de datos
        product_material_data_db = db.query(StockMateriaPrima).filter(
            StockMateriaPrima.stock_materia_prima_id == product_material.stock_materia_prima_id
        ).first()

        if product_material_data_db is None:
            raise HTTPException(status_code=404, detail="Stock de materia prima no encontrado")

        # Convertir las cantidades a decimales
        product_material_data_db_decimal = Decimal(product_material_data_db.quantity)
        product_material_quantity_used_decimal = Decimal(product_material.quantity_used)

        # Verificamos si hay suficiente cantidad en el stock
        if product_material_quantity_used_decimal <= product_material_data_db_decimal:
            # Restamos la cantidad utilizada del stock disponible
            product_material_data_db.quantity = float(product_material_data_db_decimal - product_material_quantity_used_decimal)
            
            # Agregamos el nuevo registro de uso de materia prima
            db.add(product_material)
            # Confirmamos los cambios en la base de datos
            db.commit()
        else:
            # Si no hay suficiente cantidad, lanzamos una excepción
            raise HTTPException(status_code=400, detail="Cantidad de producto insuficiente")
        
        # Consultar el costo de producción basado en la relación, 
        # usando el ID del producto recién creado
        cost_production = (
            db.query(ProductMaterial, StockMateriaPrima)
            .filter(ProductMaterial.products_id == product_material.products_id)  # Usamos el ID del producto_material
            .join(StockMateriaPrima, StockMateriaPrima.stock_materia_prima_id == ProductMaterial.stock_materia_prima_id)
            .all()
        )

        # Inicializar el total de costo de producción
        product_final = Decimal(0)

        # Iterar sobre los resultados y calcular el costo total
        for product_material_row, stock_materia_prima in cost_production:
            try:
                quantity_used = Decimal(product_material_row.quantity_used)
                precio_compra = Decimal(stock_materia_prima.precio_compra)

                # Calcular el costo individual y sumarlo al costo total
                cost = quantity_used * precio_compra
                product_final += cost

            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Error calculating cost: {str(e)}")

        # Buscar si ya existe una entrada de CostProduction para este producto
        # Usamos 'products_id' para buscar, ya que 'cost_production_id' no existe en CostProduction
        cost_production_true = db.query(CostProduction).filter(CostProduction.products_id == product_material.products_id).first()

        print(f"Total production cost: {product_final}")

        # Si no existe, crear una nueva entrada
        if cost_production_true is None:
            cost_production_true = CostProduction(
                products_id=product_material.products_id, 
                total_cost=product_final
            )
            db.add(cost_production_true)

        else:
            # Si ya existe, actualizar el total_cost
            cost_production_true.total_cost = product_final

        # Guardar cambios en la base de datos

        # Verificar si el producto existe
        product_true = db.query(Product).filter(Product.products_id == product_material.products_id).first()

        if product_true is None:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Actualizar el stock del producto
        product_true.price_production = product_final

        db.commit()

        return {"message": "ProductMaterial created successfully and CostProduction updated"}

    except Exception as e:
        db.rollback()  # Revertir cambios en caso de error
        raise HTTPException(status_code=409, detail=str(e))


def read_product_material(user_id, product_material_id, db):
    try:
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        product_material_true = db.query(ProductMaterial).filter(ProductMaterial.product_material_id == product_material_id).first()

        if product_material_true is None:
            raise HTTPException(status_code=404, detail="ProductMaterial not found")
        
        return product_material_true
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))


def update_product_material(user_id, product_material_id, schema, db):
    try:
        # Obtener el usuario y el material del producto
        user_true = db.query(User).filter(User.id == user_id).first()
        product_material_true = db.query(ProductMaterial).filter(ProductMaterial.id == product_material_id).first()
        cost_production_true = db.query(CostProduction).filter(CostProduction.products_id == product_material_true.products_id).first()
        stock_materia_prima_true = db.query(StockMateriaPrima).filter(StockMateriaPrima.stock_materia_prima_id == product_material_true.stock_materia_prima_id).first()


        # Validar que el usuario y el material del producto existan
        if user_true is None:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        if product_material_true is None:
            raise HTTPException(status_code=404, detail="Material del producto no encontrado")

        # Verificar si el ID del producto coincide
        if schema.products_id != product_material_true.products_id:
            raise HTTPException(status_code=400, detail="El material del producto no está asociado con el producto dado")

        # Actualizar los atributos
        product_material_data = schema.dict()
        product_material_data['user_id'] = user_true.id
        product_material_data['stock_materia_prima_id'] = product_material_true.stock_materia_prima_id

        # Convertir quantity_used a Decimal para evitar errores de precisión
        quantity_used_decimal = Decimal(schema.quantity_used)
        product_material_quantity_used_decimal = Decimal(product_material_true.quantity_used)

        # Ajustar la cantidad usada dependiendo de si es mayor o menor que la actual
        if quantity_used_decimal > product_material_quantity_used_decimal:
            diferencia = quantity_used_decimal - product_material_quantity_used_decimal
            product_material_data['quantity_used'] = product_material_quantity_used_decimal + diferencia

            stock_materia_prima_true.quantity = stock_materia_prima_true.quantity - diferencia


        elif quantity_used_decimal < product_material_quantity_used_decimal:

            diferencia = product_material_quantity_used_decimal - quantity_used_decimal
            product_material_data['quantity_used'] = product_material_quantity_used_decimal - diferencia
            
            stock_materia_prima_true.quantity = stock_materia_prima_true.quantity + diferencia
        
        for key, value in product_material_data.items():
            # Convertir 'name' a minúsculas si es parte de los datos
            if key == 'name' and isinstance(value, str):
                value = value.lower()

            setattr(product_material_true, key, value)

        # Confirmar los cambios en la base de datos
        db.commit()

        if product_material_data != product_material_true:
            pass
            
            cost_production = (
                db.query(ProductMaterial, StockMateriaPrima)
                .filter(ProductMaterial.products_id == product_material_data['products_id'])  # Usamos el ID del producto_material
                .join(StockMateriaPrima, StockMateriaPrima.stock_materia_prima_id == ProductMaterial.stock_materia_prima_id)
                .all()
            )

            product_final = Decimal(0)

            # Iterar sobre los resultados y calcular el costo total
            for product_material_row, stock_materia_prima in cost_production:
                try:
                    quantity_used = Decimal(product_material_row.quantity_used)
                    precio_compra = Decimal(stock_materia_prima.precio_compra)

                    # Calcular el costo individual y sumarlo al costo total
                    cost = quantity_used * precio_compra
                    product_final += cost
                except Exception as e:
                    raise HTTPException(status_code=400, detail=f"Error calculating cost: {str(e)}")

            cost_production_true.total_cost = product_final
            db.commit()
        
        db.refresh(product_material_true)

        return {"message": "Material del producto actualizado con éxito"}
    
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        # Registrar la excepción y lanzar una HTTPException genérica
        raise HTTPException(status_code=500, detail="Ocurrió un error inesperado: " + str(e))


def delete_product_material(user_id, product_material_id, db):
    try:
        # Verificar si el usuario existe
        user_true = db.query(User).filter(User.id == user_id).first()
        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Consultar el ProductMaterial y la StockMateriaPrima relacionados
        product_material_true = (db.query(ProductMaterial, StockMateriaPrima)
                                 .filter(ProductMaterial.id == product_material_id)
                                 .filter(ProductMaterial.products_id == ProductMaterial.products_id)
                                 .filter(StockMateriaPrima.stock_materia_prima_id == ProductMaterial.stock_materia_prima_id)
                                 .all())

        if not product_material_true:
            raise HTTPException(status_code=404, detail="ProductMaterial not found")

        # Calcular la diferencia para restar del costo de producción total
        diferencia = {}

        for product_material_row, stock_materia_prima in product_material_true:
            try:
                quantity_used = Decimal(product_material_row.quantity_used)
                precio_compra = Decimal(stock_materia_prima.precio_compra)

                resultado = quantity_used * precio_compra
                diferencia[product_material_row.products_id] = resultado

                stock_materia_prima.quantity = Decimal(stock_materia_prima.quantity) + quantity_used
            except Exception as e:
                raise HTTPException(status_code=409, detail=f"Error calculating cost: {str(e)}")

        # Restar el costo de producción de cada producto
        for product_id, diff_cost in diferencia.items():
            # Buscar la entrada de CostProduction para el producto
            cost_production_true = db.query(CostProduction).filter(CostProduction.products_id == product_id).first()

            if cost_production_true is None:
                raise HTTPException(status_code=404, detail=f"CostProduction not found for product ID {product_id}")
            else:
                print(f"Diferencia calculada: {diff_cost}")
                print(f"Total cost antes: {cost_production_true.total_cost}")

                # Restar la diferencia y actualizar el total
                cost_production_true.total_cost = Decimal(cost_production_true.total_cost) - Decimal(diff_cost)

                print(f"Total cost después: {cost_production_true.total_cost}")

        # Eliminar el ProductMaterial individualmente
        for product_material_row, _ in product_material_true:
            db.delete(product_material_row)

        # Guardar cambios en la base de datos
        db.commit()

        return {"message": "ProductMaterial deleted successfully and CostProduction updated"}

    except Exception as e:
        db.rollback()  # Revertir cambios en caso de error
        raise HTTPException(status_code=409, detail=str(e))
