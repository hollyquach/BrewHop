from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional

class Error(BaseModel):
    message: str

<<<<<<< HEAD
class Accounts(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    hashed_password: str
=======
>>>>>>> main
class AccountsIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str

class AccountsOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
<<<<<<< HEAD


class AccountOutWithPassword(AccountsOut):
    hashed_password: str

class DuplicateAccountError(ValueError):
    pass

class AccountsRepository:
    def get_one(self, email: str) -> Optional[Accounts]:
=======
    password: str

class AccountsRepository:
    def get_one(self, accounts_id: int) -> Optional[AccountsOut]:
>>>>>>> main
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
<<<<<<< HEAD
                            SELECT id, first_name, last_name, email, hashed_password
                            FROM accounts
                            WHERE email = %s
                        """,
                        [email]
=======
                            SELECT id, first_name, last_name, email, password
                            FROM accounts
                            WHERE id = %s
                        """,
                        [accounts_id]
>>>>>>> main
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
<<<<<<< HEAD

                    return Accounts(
                    id=record[0],
                    first_name=record[1],
                    last_name=record[2],
                    email=record[3],
                    hashed_password=record[4],
                    
                )
=======
                    return self.record_to_accounts_out(record)
>>>>>>> main
        except Exception as e:
            print(e)
            return {"message": "Could not get that accounts"}

    def get_all(self) -> Union[Error, List[AccountsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
<<<<<<< HEAD
                            SELECT id, first_name, last_name, email, hashed_password
=======
                            SELECT id, first_name, last_name, email, password
>>>>>>> main
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
<<<<<<< HEAD
                            hashed_password=record[4],
=======
                            password=record[4],
>>>>>>> main
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all accounts"}


<<<<<<< HEAD
    def create(self, accounts: AccountsIn, hashed_password: str) -> Accounts:
=======
    def create(self, accounts: AccountsIn) -> AccountsOut:
>>>>>>> main
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts
<<<<<<< HEAD
                        (first_name, last_name, email, hashed_password)
=======
                        (first_name, last_name, email, password)
>>>>>>> main
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        accounts.first_name,
                        accounts.last_name,
                        accounts.email,
<<<<<<< HEAD
                        hashed_password
                    ]
                )
                id = result.fetchone()[0]
                return Accounts(
                    id=id,
                    first_name=accounts.first_name,
                    last_name=accounts.last_name,
                    email=accounts.email,
                    hashed_password=hashed_password,
                )
                    
=======
                        accounts.password
                    ]
                )
                id = result.fetchone()[0]
                old_data = accounts.dict()
                return AccountsOut(id=id, **old_data)
>>>>>>> main

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

<<<<<<< HEAD
    # def record_to_accounts_out(self, record):
    #     return AccountsOut(
    #         id=record[0],
    #         first_name=record[1],
    #         last_name=record[2],
    #         email=record[3],
    #         hashed_password=record[4],
    #     )
=======
    def record_to_accounts_out(self, record):
        return AccountsOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            password=record[4],
        )
>>>>>>> main
