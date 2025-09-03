from fastapi import FastAPI
from database import engine, Base
from routers import user, account, request, send, api, auth
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

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
