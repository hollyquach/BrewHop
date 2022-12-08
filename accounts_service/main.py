from fastapi import FastAPI
from router import accounts
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()
app.include_router(accounts.router)
app.include_router(authenticator.router)


origins = [
    os.environ["REACT_APP_HOST"]
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
