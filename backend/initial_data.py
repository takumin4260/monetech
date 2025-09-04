from sqlalchemy.orm import Session
from crud.user import create_user
from schemas.user import UserCreate
from models.user import User
from crud.account import create_account
from schemas.account import AccountCreate
from models.account import Account


def create_initial_data(db: Session):
    existing_user = db.query(User).first()

    if existing_user is None:
        user1 = UserCreate(
            name="太郎", icon="taro.png", email="taro@example.com", password="taro"
        )
        create_user(db, user1)
        
        user2 = UserCreate(
            name="花子", icon="hanako.png", email="hanako@example.com", password="hanako"
        )
        create_user(db, user2)
        
        user3 = UserCreate(
            name="次郎", icon="jiro.png", email="jiro@example.com", password="jiro"
        )
        create_user(db, user3)

    existing_account = db.query(Account).first()
    
    if existing_account is None:
        account1 = AccountCreate(user_id=1, deposit=10000)
        create_account(db, account1)
        
        account2 = AccountCreate(user_id=2, deposit=15000)
        create_account(db, account2)
        
        account3 = AccountCreate(user_id=3, deposit=20000)
        create_account(db, account3)
