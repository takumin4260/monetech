from pydantic import BaseModel, ConfigDict


class AccountBase(BaseModel):
    user_id: int
    deposit: int


class AccountCreate(AccountBase):
    pass


class Account(AccountBase):
    account_number: int

    model_config = ConfigDict(from_attributes=True)
