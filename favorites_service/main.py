from fastapi import FastAPI
from routers import favorites


app = FastAPI()
app.include_router(favorites.router)