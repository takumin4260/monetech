from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from utils.auth import get_current_user
from schemas.api import MeResponse, UserResponse, UsersResponse
from crud import user as crud_user
from crud import account as crud_account

router = APIRouter(tags=["api"])


@router.get("/me", response_model=MeResponse)
def get_me(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    user = crud_user.get_user_by_id(db, current_user.id)
    account = crud_account.get_account_by_user_id(db, current_user.id)
    return MeResponse(user=user, account=account)


@router.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = crud_user.get_user_by_id(db, user_id)
    account = crud_account.get_account_by_user_id(db, user_id)
    return UserResponse(user=user, account=account)

@router.get("/users", response_model=UsersResponse)
def get_users(db: Session = Depends(get_db)):
    users = crud_user.get_all_users(db)
    return UsersResponse(users=users)
    return UserResponse(user=user, account=account)
