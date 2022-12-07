FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /accounts_service

# Copy the top-level files in your service's directory
# Modify these instructions to do that
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY authenticator.py authenticator.py
COPY __init__.py __init__.py
COPY Dockerfile.dev Dockerfile.dev

# Copy all of the subdirectories in your service's directory
# Modify these instructions to do that
COPY /migrations/__init__.py /migrations/__init__.py
COPY /migrations/__main__.py /migrations/__main__.py
COPY /migrations/001_create_table.py /migrations/001_create_table.py
COPY /queries/accounts.py /queries/accounts.py
COPY /queries/pool.py /queries/pool.py
COPY /router/accounts.py /router/accounts.py

RUN pip install -r requirements.txt
CMD /wait && python -m migrations up && uvicorn main:app --reload --host 0.0.0.0