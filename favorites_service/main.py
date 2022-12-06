from fastapi import FastAPI
from routers import favorites
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(favorites.router)


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
