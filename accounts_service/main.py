
from fastapi import FastAPI
from router import accounts


app = FastAPI()
app.include_router(accounts.router)