"""Initial migration

Revision ID: 17f7ad8e90fb
Revises: 
Create Date: 2024-09-13 20:16:11.524915

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '17f7ad8e90fb'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    # Correct the column name from 'descrñiption_product' to 'description_product'
    op.add_column('products', sa.Column('description_product', sa.String(length=255), nullable=True))
    op.drop_column('products', 'descrñiption_product')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    # Reverse the change, restore the original column name
    op.add_column('products', sa.Column('descrñiption_product', sa.String(length=255), nullable=True))
    op.drop_column('products', 'description_product')
    # ### end Alembic commands ###
