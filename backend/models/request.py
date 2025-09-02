from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Uuid
from sqlalchemy.sql import func
from database import Base

from uuid import uuid4


class Request(Base):
    __tablename__ = "requests"

    id = Column(Uuid(as_uuid=True), primary_key=True, index=True, default=uuid4)
    money = Column(Integer)
    message = Column(String, nullable=True)
    created_by = Column(Integer, ForeignKey("users.id"), index=True)
    date = Column(DateTime(timezone=True), server_default=func.now())
