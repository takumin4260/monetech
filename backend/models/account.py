from sqlalchemy import Column, Integer, ForeignKey
from database import Base


class Account(Base):
    __tablename__ = "accounts"

    account_number = Column(Integer, primary_key=True, index=True, autoincrement=True)
    deposit = Column(Integer, default=0)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
