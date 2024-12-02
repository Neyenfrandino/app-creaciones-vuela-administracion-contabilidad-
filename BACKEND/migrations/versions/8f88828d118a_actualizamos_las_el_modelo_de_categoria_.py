"""Actualizamos el modelo de categoría y le agregamos un parámetro de url-imágenes

Revision ID: 8f88828d118a
Revises: 0800ab97db15
Create Date: 2024-11-30 08:06:08.530949
"""

# revision identifiers, used by Alembic.
from alembic import op
import sqlalchemy as sa
from typing import Sequence, Union  # <-- Importa 'Union' aquí

revision: str = '8f88828d118a'
down_revision: Union[str, None] = '0800ab97db15'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Agregar la columna img_url a la tabla category_of_products
    op.add_column('category_of_products', sa.Column('img_url', sa.Text, nullable=True))

def downgrade() -> None:
    # Eliminar la columna img_url en la tabla category_of_products
    op.drop_column('category_of_products', 'img_url')
