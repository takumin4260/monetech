from pydantic import BaseModel, ConfigDict, NonNegativeInt
from datetime import datetime
from uuid import UUID


class RequestBase(BaseModel):
    # 後でcreated_byをlogin_userに置き換える
    money: NonNegativeInt
    message: str | None
    created_by: int


class RequestCreate(RequestBase):
    pass


class Request(RequestBase):
    id: UUID
    date: datetime

    model_config = ConfigDict(from_attributes=True)
