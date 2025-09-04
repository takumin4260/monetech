from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from schemas.user import UserPublic
from schemas.auth import AuthLogin
from crud import user as crud_user
from database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=UserPublic)
def login(request: Request, form_data: AuthLogin, db: Session = Depends(get_db)) -> UserPublic:
    user = crud_user.authenticate_user(db, form_data.email, form_data.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    request.session["user_id"] = user.id

    return user


@router.post("/logout")
def logout(request: Request) -> dict:
    request.session.clear()
    return {"message": "Successfully logged out"}
