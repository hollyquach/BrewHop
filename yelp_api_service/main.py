
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import yelpAPI
import os


app = FastAPI()
app.include_router(yelpAPI.router)

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
