from sqlalchemy.orm import Session
from crud.user import create_user
from schemas.user import UserCreate
from models.user import User


def create_initial_data(db: Session):
    existing_user = db.query(User).first()

    if existing_user is None:
        user1 = UserCreate(
            name="hoge", icon="hoge", email="hoge@example.com", password="hoge"
        )
        create_user(db, user1)
