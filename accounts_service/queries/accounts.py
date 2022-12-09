from pydantic import BaseModel
from queries.pool import get_conn
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class Accounts(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    hashed_password: str


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


class AccountOutWithPassword(AccountsOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass


class AccountsRepository:
    def get_one(self, email: str) -> Optional[Accounts]:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                result = db.execute(
                    """
                        SELECT
                            id,
                            first_name,
                            last_name,
                            email,
                            hashed_password
                        FROM accounts
                        WHERE email = %s
                    """,
                    [email],
                )
                record = result.fetchone()
                if record is None:
                    return None

                return Accounts(
                    id=record[0],
                    first_name=record[1],
                    last_name=record[2],
                    email=record[3],
                    hashed_password=record[4],
                )
            connection.close()
        except Exception as e:
            print(e)
            return {"message": "Could not get that accounts"}

    def get_all(self) -> Union[Error, List[AccountsOut]]:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        SELECT
                            id,
                            first_name,
                            last_name,
                            email,
                            hashed_password
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
                        hashed_password=record[4],
                    )
                    for record in db
                ]
            connection.close()
        except Exception as e:
            print(e)
            return {"message": "Could not get all accounts"}

    def create(self, accounts: AccountsIn, hashed_password: str) -> Accounts:
        connection = get_conn()
        with connection.cursor() as db:
            result = db.execute(
                """
                    INSERT INTO accounts
                        (first_name, last_name, email, hashed_password)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                """,
                [
                    accounts.first_name,
                    accounts.last_name,
                    accounts.email,
                    hashed_password,
                ],
            )
            id = result.fetchone()[0]
            return Accounts(
                id=id,
                first_name=accounts.first_name,
                last_name=accounts.last_name,
                email=accounts.email,
                hashed_password=hashed_password,
            )
        connection.close()

    def delete(self, accounts_id: int) -> bool:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        DELETE FROM accounts
                        WHERE id = %s
                    """,
                    [accounts_id],
                )
                return True
            connection.close()
        except Exception as e:
            print(e)
            return False

    # def record_to_accounts_out(self, record):
    #     return AccountsOut(
    #         id=record[0],
    #         first_name=record[1],
    #         last_name=record[2],
    #         email=record[3],
    #         hashed_password=record[4],
    #     )
