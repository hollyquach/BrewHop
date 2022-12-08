FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip

WORKDIR /app
COPY authtoken.py authtoken.py
COPY main.py main.py
COPY requirements.txt requirements.txt
COPY migrations migrations
COPY queries queries
COPY routers routers

RUN python -m pip install -r requirements.txt

CMD python -m migrations up && uvicorn main:app --reload --host 0.0.0.0