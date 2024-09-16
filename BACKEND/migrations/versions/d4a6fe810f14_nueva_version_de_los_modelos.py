"""
nueva version de los modelos

Revision ID: d4a6fe810f14
Revises: 8014143ac367
Create Date: 2024-09-15 09:31:56.098163
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd4a6fe810f14'
down_revision: Union[str, None] = '8014143ac367'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Primero eliminamos la antigua clave externa que relaciona 'cost_production' con 'products'
    op.drop_constraint('cost_production_products_id_fkey', 'cost_production', type_='foreignkey', schema=None)

    # Ahora creamos la nueva clave externa que incluye la opción 'ON DELETE CASCADE'
    op.create_foreign_key(
        'cost_production_products_id_fkey',  # Nombre de la clave externa
        'cost_production',                   # Tabla en la que se crea la clave externa
        'products',                          # Tabla referenciada
        ['products_id'],                     # Columna en 'cost_production'
        ['products_id'],                     # Columna en 'products'
        ondelete='CASCADE'                   # Acción en caso de eliminación
    )


def downgrade() -> None:
    # Primero eliminamos la clave externa actual
    op.drop_constraint('cost_production_products_id_fkey', 'cost_production', type_='foreignkey', schema=None)

    # Luego recreamos la clave externa original sin la opción 'ON DELETE CASCADE'
    op.create_foreign_key(
        'cost_production_products_id_fkey',  # Nombre de la clave externa
        'cost_production',                   # Tabla en la que se crea la clave externa
        'products',                          # Tabla referenciada
        ['products_id'],                     # Columna en 'cost_production'
        ['products_id']                      # Columna en 'products'
    )
