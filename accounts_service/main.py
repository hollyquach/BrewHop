from fastapi import FastAPI
from router import accounts
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8001",
    "http://localhost:8002",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accounts.router)
app.include_router(authenticator.router)
