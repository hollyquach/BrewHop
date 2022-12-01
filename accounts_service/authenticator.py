import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountsRepository, Accounts

class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: AccountsRepository,
    ):
        return accounts.get_one(email)

    def get_account_getter(
        self,
        accounts: AccountsRepository = Depends(),
    ):
        return accounts

    def get_hashed_password(self, accounts: Accounts):
        print("accounts", accounts)
        return accounts.hashed_password

authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])