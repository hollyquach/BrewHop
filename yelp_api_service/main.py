
from fastapi import FastAPI, APIRouter

from routers import yelpAPI


app = FastAPI()
app.include_router(yelpAPI.router)
