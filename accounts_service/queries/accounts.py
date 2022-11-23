from pydantic import BaseModel, EmailStr
from queries.pool import pool
from typing import List, Union, Optional

class Error(BaseModel):
    message: str

class AccountsIn(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str

class AccountsOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str


class AccountsRepository:
    def get_one(self, accounts_id: int) -> Optional[AccountsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            SELECT id, first_name, last_name, email, password
                            FROM accounts
                            WHERE id = %s
                        """,
                        [accounts_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_accounts_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that accounts"}


    def get_all(self) -> Union[Error, List[AccountsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            SELECT id, first_name, last_name, email, password
                            FROM accounts
                            ORDER BY last_name;
                        """
                    )
                    return [
                        AccountsOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            email=record[3],
                            password=record[4],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all accounts"}


    def create(self, accounts: AccountsIn) -> AccountsOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (first_name, last_name, email, password)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        accounts.first_name,
                        accounts.last_name,
                        accounts.email,
                        accounts.password
                    ]
                )
                id = result.fetchone()[0]
                old_data = accounts.dict()
                return AccountsOut(id=id, **old_data)

    def delete(self, accounts_id:int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s
                        """,
                        [accounts_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def record_to_accounts_out(self, record):
        return AccountsOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            password=record[4],
        )