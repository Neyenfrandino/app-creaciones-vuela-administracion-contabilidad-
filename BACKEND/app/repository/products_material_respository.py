from fastapi import HTTPException
from app.db.models import ProductMaterial, User, StockMateriaPrima, CostProduction

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
        db.add(product_material)
        db.commit()  # Commit aquí para que product_material tenga un ID asignado

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
        user_true = db.query(User).filter(User.id == user_id).first()

        if user_true is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        product_material_true = db.query(ProductMaterial).filter(ProductMaterial.product_material_id == product_material_id).first()

        if product_material_true is None:
            raise HTTPException(status_code=404, detail="ProductMaterial not found")
        
        # Convertir el esquema a un diccionario y asignar el user_id
        product_material_data = schema.dict()
        product_material_data['user_id'] = user_true.id

# Actualizar los atributos del producto actual
        for key, value in product_material_data.items():
            # Asegurarse de que 'value' sea un diccionario para acceder a sus valores
            if isinstance(value, dict) and 'name' in value:
                # Convertir el campo 'name' a minúsculas
                value['name'] = value['name'].lower()

            # Actualizar los atributos del objeto 'product_material_true'
            setattr(product_material_true, key, value)
                
        db.commit()
        db.refresh(product_material_true)

        return {"message": "ProductMaterial updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=409, detail=str(e))

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
