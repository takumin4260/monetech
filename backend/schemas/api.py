from pydantic import BaseModel, NonNegativeInt
from schemas.user import UserPublic
from schemas.account import AccountPublic
from datetime import datetime


class MeResponse(BaseModel):
    user: UserPublic
    account: AccountPublic


class UserResponse(BaseModel):
    user: UserPublic


class TransfersRequest(BaseModel):
    to_user_id: int
    money: NonNegativeInt
    message: str | None


class TransfersResponse(BaseModel):
    id: int
    from_user_id: int
    to_user_id: int
    money: NonNegativeInt
    message: str | None
    date: datetime
    completed: bool
