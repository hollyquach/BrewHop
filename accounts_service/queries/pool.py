import os
from psycopg import connect


keepalive_kwargs = {
    "keepalives": 1,
    "keepalives_idle": 60,
    "keepalives_interval": 10,
    "keepalives_count": 5
}

pool = connect(conninfo=os.environ["DATABASE_URL"], **keepalive_kwargs)
