from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '3cf021af27ba'
down_revision = 'd81052b5bef3'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### Commands auto generated by Alembic - please adjust! ###

    # Add new columns
    op.add_column('user', sa.Column('lastname', sa.String(), nullable=True))
    op.add_column('user', sa.Column('username', sa.String(), unique=True, nullable=True))  # Allow null values for username
    op.add_column('user', sa.Column('phone', sa.String(), nullable=True))
    op.add_column('user', sa.Column('address', sa.String(), nullable=True))
    op.add_column('user', sa.Column('city', sa.String(), nullable=True))
    op.add_column('user', sa.Column('photo', sa.Text(), nullable=True))

    # Create indexes for new columns
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=False)
    op.create_index(op.f('ix_user_phone'), 'user', ['phone'], unique=False)

    # ### End Alembic commands ###


def downgrade() -> None:
    # ### Commands auto generated by Alembic - please adjust! ###

    # Drop indexes
    op.drop_index(op.f('ix_user_phone'), table_name='user')
    op.drop_index(op.f('ix_user_username'), table_name='user')

    # Drop columns
    op.drop_column('user', 'photo')
    op.drop_column('user', 'city')
    op.drop_column('user', 'address')
    op.drop_column('user', 'phone')
    op.drop_column('user', 'lastname')
    op.drop_column('user', 'username')  # Remove username if you want to start with a clean table

    # ### End Alembic commands ###