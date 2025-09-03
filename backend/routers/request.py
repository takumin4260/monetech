from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from schemas.request import Request, RequestCreate
from crud import request as crud_request
from uuid import UUID

router = APIRouter(
    prefix="/debug/requests",
    tags=["requests"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=Request)
def create_request(request: RequestCreate, db: Session = Depends(get_db)):
    # 後でcreated_byをlogin_userに置き換える
    return crud_request.create_request(db=db, request=request)


@router.get("/{request_id}", response_model=Request)
def read_request(request_id: UUID, db: Session = Depends(get_db)):
    db_request = crud_request.get_request_by_id(db, request_id=request_id)
    if db_request is None:
        raise HTTPException(status_code=404, detail="Request not found")
    return db_request
