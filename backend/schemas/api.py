from pydantic import BaseModel
from schemas.user import UserPublic
from schemas.account import AccountPublic, AccountNum


class MeResponse(BaseModel):
    user: UserPublic
    account: AccountPublic


class UserResponse(BaseModel):
    user: UserPublic
    account: AccountNum
