from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import validates
from database import Base
import re


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    icon = Column(String, default="default_icon.png")
    email = Column(String, unique=True)
    password = Column(String)
