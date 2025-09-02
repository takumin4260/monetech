from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.account import Account, AccountCreate
from crud import account as crud_account

router = APIRouter(
    prefix="/accounts",
    tags=["accounts"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=Account)
def create_account(account: AccountCreate, db: Session = Depends(get_db)):
    return crud_account.create_account(db=db, account=account)


@router.get("/{account_number}", response_model=Account)
def read_account(account_number: int, db: Session = Depends(get_db)):
    db_account = crud_account.get_account_by_account_number(db, account_number=account_number)
    if db_account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return db_account
