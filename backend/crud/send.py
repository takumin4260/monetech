from sqlalchemy.orm import Session
from models.send import Send
from schemas.send import SendCreate


def get_send_by_id(db: Session, send_id: int) -> Send | None:
    return db.query(Send).filter(Send.id == send_id).first()


def create_send(db: Session, send: SendCreate) -> Send:
    db_send = Send(
        from_user=send.from_user,
        to_user=send.to_user,
        money=send.money,
        message=send.message,
    )
    db.add(db_send)
    db.commit()
    db.refresh(db_send)
    return db_send


def delete_send(db: Session, send_id: int):
    db_send = db.query(Send).filter(Send.id == send_id).first()
    if db_send:
        db.delete(db_send)
        db.commit()
        return True
    return False

def get_all_sends(db: Session) -> list[Send]:
    return db.query(Send).all()