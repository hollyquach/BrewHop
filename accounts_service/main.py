
from fastapi import FastAPI
from router import accounts
# from authenticator import authenticator

app = FastAPI()
# app.include_router(authenticator.router)
app.include_router(accounts.router)