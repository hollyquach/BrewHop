FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip

WORKDIR /app

COPY main.py main.py
COPY requirements.txt requirements.txt
COPY assets assets
COPY migrations migrations
COPY routers routers

RUN python -m pip install -r requirements.txt

CMD  uvicorn main:app --reload --host 0.0.0.0