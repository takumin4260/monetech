from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.api import MeResponse, UsersResponse
from crud import user as crud_user
from crud import account as crud_account

router = APIRouter(tags=["api"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/me", response_model=MeResponse)
def get_me(db: Session = Depends(get_db)):
    user_id = 1
    user = crud_user.get_user_by_id(db, user_id)
    account = crud_account.get_account_by_user_id(db, user_id)
    return MeResponse(user=user, account=account)

@router.get("/users", response_model=UsersResponse)
def get_users(db: Session = Depends(get_db)):
    users = crud_user.get_all_users(db)
    return UsersResponse(users=users)