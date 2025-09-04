from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.account import Account, AccountCreate
from crud import account as crud_account

router = APIRouter(
    prefix="/debug/accounts",
    tags=["accounts"],
)


@router.post("/", response_model=Account)
def create_account(account: AccountCreate, db: Session = Depends(get_db)) -> Account:
    return crud_account.create_account(db=db, account=account)


@router.get("/{account_number}", response_model=Account)
def read_account(account_number: int, db: Session = Depends(get_db)) -> Account:
    db_account = crud_account.get_account_by_account_number(
        db, account_number=account_number
    )
    if db_account is None:
        raise HTTPException(status_code=404, detail="Account not found")
    return db_account
