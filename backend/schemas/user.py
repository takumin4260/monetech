from pydantic import BaseModel, ConfigDict, EmailStr


class UserBase(BaseModel):
    name: str
    icon: str
    email: EmailStr
    password: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class UserPublic(BaseModel):
    id: int
    name: str
    icon: str

    model_config = ConfigDict(from_attributes=True)
