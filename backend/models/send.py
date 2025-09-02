from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from database import Base


class Send(Base):
    __tablename__ = "sends"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    from_user = Column(Integer, ForeignKey("users.id"), index=True)
    to_user = Column(Integer, ForeignKey("users.id"), index=True)
    money = Column(Integer, default=0)
    message = Column(String, nullable=True)
    date = Column(DateTime(timezone=True), server_default=func.now())
