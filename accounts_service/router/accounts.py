from fastapi import APIRouter, Depends, Response
from queries.accounts import AccountsIn, AccountsOut, AccountsRepository, Error
from typing import Union, List, Optional

router = APIRouter()

@router.post("/accounts", response_model= Union[AccountsOut, Error])
def create_accounts(
    accounts: AccountsIn,
    # response: Response,
    repo: AccountsRepository = Depends()
):
    # response.status_code= 400
    return repo.create(accounts)


@router.get("/accounts", response_model=Union[List[AccountsOut], Error])
def get_all(repo:AccountsRepository = Depends()):
    return repo.get_all()


@router.get("/accounts/{accounts_id}", response_model=(Optional[AccountsOut]))
def get_one_account(
    accounts_id: int,
    response: Response,
    repo: AccountsRepository = Depends(),
) -> AccountsOut:
    accounts = repo.get_one(accounts_id)
    if accounts is None:
        response.status_code = 404
    return accounts


@router.delete("/accounts/{accounts_id}", response_model=bool)
def delete_accounts(
    accounts_id: int,
    repo: AccountsRepository = Depends(),
) -> bool:
    return repo.delete(accounts_id)