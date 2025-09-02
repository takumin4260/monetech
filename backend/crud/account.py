from sqlalchemy.orm import Session
from models.account import Account
from schemas.account import AccountCreate


def get_account(db: Session, account_number: int) -> Account | None:
    return db.query(Account).filter(Account.account_number == account_number).first()


def get_account_by_user_id(db: Session, user_id: int) -> Account | None:
    return db.query(Account).filter(Account.user_id == user_id).first()


def create_account(db: Session, account: AccountCreate) -> Account:
    db_account = Account(user_id=account.user_id, deposit=account.deposit)
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account
