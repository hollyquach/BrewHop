FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip

WORKDIR /app
COPY authenticator.py authenticator.py
COPY main.py main.py
COPY requirements.txt requirements.txt
COPY migrations migrations
COPY queries queries
COPY router router

RUN python -m pip install -r requirements.txt

CMD python -m migrations up && uvicorn main:app --reload --host 0.0.0.0