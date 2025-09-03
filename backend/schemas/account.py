from pydantic import BaseModel, ConfigDict, NonNegativeInt


class AccountBase(BaseModel):
    user_id: int
    deposit: NonNegativeInt


class AccountCreate(AccountBase):
    pass


class Account(AccountBase):
    account_number: int

    model_config = ConfigDict(from_attributes=True)


class AccountPublic(BaseModel):
    account_number: int
    deposit: NonNegativeInt

    model_config = ConfigDict(from_attributes=True)


class AccountNum(BaseModel):
    account_number: int

    model_config = ConfigDict(from_attributes=True)
