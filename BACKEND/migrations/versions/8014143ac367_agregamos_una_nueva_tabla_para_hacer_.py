"""
agregamos una nueva tabla para hacer una relacion muchos a muchos entre la tablas product y materiales

Revision ID: 8014143ac367
Revises: 17f7ad8e90fb
Create Date: 2024-09-15 07:55:22.890807
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8014143ac367'
down_revision: Union[str, None] = '17f7ad8e90fb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Obtén el enlace a la base de datos
    conn = op.get_bind()
    
    # Verifica si la tabla 'product_material' ya existe
    if not conn.dialect.has_table(conn, 'product_material'):
        # Creamos la nueva tabla intermedia 'product_material'
        op.create_table('product_material',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('products_id', sa.Integer(), nullable=False),
            sa.Column('stock_materia_prima_id', sa.Integer(), nullable=False),
            sa.ForeignKeyConstraint(['products_id'], ['products.products_id'], ),
            sa.ForeignKeyConstraint(['stock_materia_prima_id'], ['stock_materia_prima.stock_materia_prima_id'], ),
            sa.PrimaryKeyConstraint('id')
        )

    # Agregamos la nueva columna 'product_material_id' a la tabla 'cost_production'
    op.add_column('cost_production', sa.Column('product_material_id', sa.Integer(), nullable=False))

    # Eliminamos la antigua clave externa en 'cost_production' que relacionaba directamente con 'stock_materia_prima'
    op.drop_constraint('cost_production_stock_materia_prima_id_fkey', 'cost_production', type_='foreignkey')

    # Creamos la nueva clave externa en 'cost_production' que ahora relaciona con la tabla intermedia 'product_material'
    op.create_foreign_key(None, 'cost_production', 'product_material', ['product_material_id'], ['id'])

    # Eliminamos la columna antigua 'stock_materia_prima_id' de 'cost_production' ya que no es necesaria
    op.drop_column('cost_production', 'stock_materia_prima_id')


def downgrade() -> None:
    # Obtén el enlace a la base de datos
    conn = op.get_bind()

    # Verifica si la tabla 'product_material' existe antes de intentar eliminarla
    if conn.dialect.has_table(conn, 'product_material'):
        # Eliminamos la tabla intermedia 'product_material'
        op.drop_table('product_material')

    # Eliminamos la nueva clave externa que relacionaba 'cost_production' con 'product_material'
    op.drop_constraint(None, 'cost_production', type_='foreignkey')

    # Agregamos de nuevo la columna 'product_material_id' a 'cost_production'
    op.add_column('cost_production', sa.Column('product_material_id', sa.Integer(), nullable=False))

    # Recreemos la clave externa original que relacionaba 'cost_production' directamente con 'stock_materia_prima'
    op.create_foreign_key('cost_production_stock_materia_prima_id_fkey', 'cost_production', 'stock_materia_prima', ['stock_materia_prima_id'], ['stock_materia_prima_id'])

    # Eliminamos la columna 'product_material_id' que habíamos agregado a 'cost_production'
    op.drop_column('cost_production', 'product_material_id')

    # Agregamos de nuevo la columna 'stock_materia_prima_id' a 'cost_production'
    op.add_column('cost_production', sa.Column('stock_materia_prima_id', sa.Integer(), nullable=False))
