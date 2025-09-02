from fastapi import FastAPI
from database import engine, Base
from routers import user, account, send

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user.router)
app.include_router(send.router)
app.include_router(account.router)
