from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.user import User, UserCreate
from crud import user as crud_user

router = APIRouter(
    prefix="/debug/users",
    tags=["users"],
)


@router.post("/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)) -> User:
    return crud_user.create_user(db=db, user=user)


@router.get("/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)) -> User:
    db_user = crud_user.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
