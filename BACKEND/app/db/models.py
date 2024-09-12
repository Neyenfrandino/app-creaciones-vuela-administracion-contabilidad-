from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, index=True, nullable=False) 
    email = Column(String, unique=True, index=True, nullable=False) 
    password = Column(String, nullable=False)
    date_creation = Column(Date, nullable=False) 
    name = Column(String, nullable=True) 
    last_name = Column(String, nullable=True) 

    # Relación con Pills_all_and_users (Many-to-Many a través de la tabla intermedia)
    pills_all_and_users = relationship("Pills_all_and_users", back_populates="users") 


class Pills_all(Base):
    __tablename__ = "pills-all"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name_pills = Column(String, nullable=False) 
    description_pills = Column(String, nullable=True)
    mode_use_pills = Column(String, nullable=True)
    cant_pills_in_tablet = Column(Integer, nullable=False)

    # Relación con Pills_all_and_users (Many-to-Many a través de la tabla intermedia)
    pills_all_and_users = relationship("Pills_all_and_users", back_populates="pills_all") 


class Info_user_about_activity(Base):
    __tablename__ = "info-user-about-activity"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    current_pills_date = Column(Date, nullable=False)
    last_pills_date = Column(Date, nullable=True)
    init_tratament_date = Column(Date, nullable=False)

    # Relación con Pills_all_and_users (One-to-One)
    pills_all_and_users = relationship("Pills_all_and_users", back_populates="info_user_about_activity", uselist=False) 


# Tabla intermedia para la relación Many-to-Many entre User y Pills_all
class Pills_all_and_users(Base):
    __tablename__ = "pills-all_and_users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    pills_all_id = Column(Integer, ForeignKey("pills-all.id"), nullable=False)
    users_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    info_user_about_activity_id = Column(Integer, ForeignKey("info-user-about-activity.id"), nullable=False)

    pills_all = relationship("Pills_all", back_populates="pills_all_and_users")
    users = relationship("User", back_populates="pills_all_and_users")
    info_user_about_activity = relationship("Info_user_about_activity", back_populates="pills_all_and_users")