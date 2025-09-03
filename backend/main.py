from fastapi import FastAPI
from database import engine, Base, SessionLocal
from routers import user, account, request, send, api, auth
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from contextlib import asynccontextmanager
from initial_data import create_initial_data

Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    db = SessionLocal()
    try:
        create_initial_data(db)
    finally:
        db.close()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(SessionMiddleware, secret_key="your_secret_key")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(send.router)
app.include_router(account.router)
app.include_router(api.router)
app.include_router(request.router)
app.include_router(auth.router)
