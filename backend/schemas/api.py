from pydantic import BaseModel
from schemas.user import UserPublic
from schemas.account import AccountPublic


class MeResponse(BaseModel):
    user: UserPublic
    account: AccountPublic
