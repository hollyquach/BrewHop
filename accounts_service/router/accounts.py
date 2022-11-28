from fastapi import APIRouter, Depends, Response
from queries.accounts import AccountsIn, AccountsOut, AccountsRepository, Error
from typing import Union, List, Optional
from jwtdown_fastapi.authentication import Token
# from authenticator import authenticator
from pydantic import BaseModel

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

# class AccountForm(BaseModel):
#     username: str
#     password: str

# class AccountToken(Token):
#     account: AccountsOut

# class HttpError(BaseModel):
#     detail: str

# router = APIRouter()


# @router.post("/api/accounts", response_model=AccountToken | HttpError)
# async def create_account(
#     info: AccountsIn,
#     request: Request,
#     response: Response,
#     repo: AccountsRepository = Depends(),
# ):
#     hashed_password = authenticator.hash_password(info.password)
#     try:
#         account = repo.create(info, hashed_password)
#     except DuplicateAccountError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Cannot create an account with those credentials",
#         )
#     form = AccountForm(username=info.email, password=info.password)
#     token = await authenticator.login(response, request, form, repo)
#     return AccountToken(account=account, **token.dict())