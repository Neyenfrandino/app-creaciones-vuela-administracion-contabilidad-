"""creamos las relaciones entre tablas que nos habian faltado especificar en models

Revision ID: c243597eb089
Revises: 6f7428633fd9
Create Date: 2024-09-06 11:17:39.084051

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c243597eb089'
down_revision: Union[str, None] = '6f7428633fd9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass  # No se requieren cambios en el esquema de la base de datos


def downgrade() -> None:
    pass  # No se requieren cambios en el esquema de la base de datos