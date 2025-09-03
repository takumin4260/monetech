from sqlalchemy.orm import Session
from models.request import Request
from schemas.request import RequestCreate
from uuid import UUID


def get_request_by_id(db: Session, request_id: UUID) -> Request | None:
    return db.query(Request).filter(Request.id == request_id).first()


def create_request(db: Session, request: RequestCreate) -> Request:
    db_request = Request(
        money=request.money, message=request.message, created_by=request.created_by
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request
