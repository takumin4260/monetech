from sqlalchemy import Column, Integer, String
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    icon = Column(String, default="default_icon.png")
    email = Column(String, unique=True, index=True)
    password = Column(String)
