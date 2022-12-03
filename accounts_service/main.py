from fastapi import FastAPI
from router import accounts
<<<<<<< HEAD
<<<<<<< HEAD
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
origins = [
    "http://localhost",
=======
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(accounts.router)

origins = [
    "http://localhost",
    "http://localhost:8000",
>>>>>>> main
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
<<<<<<< HEAD
app.include_router(accounts.router)
app.include_router(authenticator.router)
=======


app = FastAPI()
app.include_router(accounts.router)
>>>>>>> main
=======
>>>>>>> main
