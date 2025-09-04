from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from crud.user import get_user_by_id
from database import get_db

from models.user import User


def get_current_user(request: Request, db: Session = Depends(get_db)) -> User | None:
    user_id = request.session.get("user_id")

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
    )

    if user_id is None:
        raise credentials_exception

    user = get_user_by_id(db, user_id)
    if user is None:
        raise credentials_exception

    return user
