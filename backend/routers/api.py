from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.api import MeResponse
from crud import user as crud_user
from crud import account as crud_account

router = APIRouter(prefix="/api", tags=["api"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/me", response_model=MeResponse)
def get_me(user_id: int = 1, db: Session = Depends(get_db)):
    user = crud_user.get_user_by_id(db, user_id)
    account = crud_account.get_account_by_user_id(db, user_id)
    return MeResponse(user=user, account=account)
