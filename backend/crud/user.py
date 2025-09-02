from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserCreate


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: UserCreate) -> User:
    db_user = User(
        name=user.name, icon=user.icon, email=user.email, password=user.password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
