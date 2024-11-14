"""Cambiamos el tipo de dato de las imágenes de products a text

Revision ID: 0800ab97db15
Revises: 3cf021af27ba
Create Date: 2024-11-11 08:45:42.201438

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '0800ab97db15'
down_revision: Union[str, None] = '3cf021af27ba'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Cambiamos el tipo de dato de la columna image_url a Text
    op.alter_column('products', 'image_url',
                    existing_type=sa.String(length=255),
                    type_=sa.Text,
                    existing_nullable=True)

def downgrade() -> None:
    # Revertimos el tipo de dato de la columna image_url a String(255)
    op.alter_column('products', 'image_url',
                    existing_type=sa.Text,
                    type_=sa.String(length=255),
                    existing_nullable=True)
