from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from database import get_db
from schemas.send import Send, SendCreate
from crud import send as crud_send

router = APIRouter(
    prefix="/debug/sends",
    tags=["sends"],
)


@router.post("/", response_model=Send)
def create_send(send: SendCreate, db: Session = Depends(get_db)):
    return crud_send.create_send(db=db, send=send)


@router.get("/{send_id}", response_model=Send)
def read_send(send_id: int, db: Session = Depends(get_db)):
    db_send = crud_send.get_send_by_id(db, send_id=send_id)
    if db_send is None:
        raise HTTPException(status_code=404, detail="Send not found")
    return db_send


@router.delete("/{send_id}")
def delete_send(send_id: int, db: Session = Depends(get_db)):
    success = crud_send.delete_send(db, send_id)
    if not success:
        raise HTTPException(status_code=404, detail="Send not found")
    return Response(status_code=204)
