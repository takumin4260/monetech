from pydantic import BaseModel, ConfigDict, NonNegativeInt
from datetime import datetime


class SendBase(BaseModel):
    from_user: int
    to_user: int
    money: NonNegativeInt
    message: str | None


class SendCreate(SendBase):
    pass


class Send(SendBase):
    id: int
    date: datetime

    model_config = ConfigDict(from_attributes=True)
