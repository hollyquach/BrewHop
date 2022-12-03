<<<<<<< HEAD

from fastapi import FastAPI


app = FastAPI()
=======
from fastapi import FastAPI
from routers import favorites


app = FastAPI()
app.include_router(favorites.router)
>>>>>>> main
