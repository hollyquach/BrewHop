import os

from psycopg import connect


DATABASE_URL = os.environ["DATABASE_URL"]


def get_conn():
    kwargs = {"autocommit": True}
    return connect(conninfo=DATABASE_URL, **kwargs)
