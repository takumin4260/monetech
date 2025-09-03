from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from utils.auth import get_current_user
from schemas.send import SendCreate
from schemas.request import RequestCreate
from schemas.api import (
    MeResponse,
    UserResponse,
    TransfersRequest,
    TransfersResponse,
    UsersResponse,
    BillingRequest,
    BillingResponse,
)
from crud import user as crud_user
from crud import account as crud_account
from crud import send as crud_send
from crud import request as crud_request

router = APIRouter(tags=["api"])


@router.get("/me", response_model=MeResponse)
def get_me(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    user = crud_user.get_user_by_id(db, current_user.id)
    account = crud_account.get_account_by_user_id(db, current_user.id)
    return MeResponse(user=user, account=account)


@router.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = crud_user.get_user_by_id(db, user_id)
    account = crud_account.get_account_by_user_id(db, user_id)
    return UserResponse(user=user, account=account)


@router.post("/transfers", response_model=TransfersResponse)
def transfers(
    transfer: TransfersRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if transfer.money <= 0:
        raise HTTPException(status_code=400, detail="INVALID_AMOUNT")

    from_account = crud_account.get_account_by_user_id(db, current_user.id)
    if from_account is None:
        raise HTTPException(status_code=404, detail="USER_NOT_FOUND")

    to_account = crud_account.get_account_by_user_id(db, transfer.to_user_id)
    if to_account is None:
        raise HTTPException(status_code=404, detail="USER_NOT_FOUND")

    if from_account.deposit - transfer.money < 0:
        raise HTTPException(status_code=400, detail="INSUFFICIENT_FUNDS")

    try:
        from_account.deposit -= transfer.money
        db.add(from_account)

        to_account.deposit += transfer.money
        db.add(to_account)

        db.commit()

        db.refresh(from_account)
        db.refresh(to_account)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="TRANSFER_FAILED")

    crud_send.create_send(
        db,
        SendCreate(
            from_user=current_user.id,
            to_user=transfer.to_user_id,
            money=transfer.money,
            message=transfer.message,
        ),
    )

    return TransfersResponse(
        completed=True,
    )


@router.get("/users", response_model=UsersResponse)
def get_users(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    users = crud_user.get_all_users(db)
    users.remove(current_user)
    return UsersResponse(users=users)


@router.post("/billing", response_model=BillingResponse)
def billing(
    req: BillingRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if req.money <= 0:
        raise HTTPException(status_code=400, detail="INVALID_AMOUNT")

    db_request = crud_request.create_request(
        db,
        RequestCreate(
            money=req.money,
            message=req.message,
            created_by=current_user.id,
            completed=False,
        ),
    )

    return BillingResponse(url="http://localhost:3000/request/{}".format(db_request.id))
