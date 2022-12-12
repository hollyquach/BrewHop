from fastapi import (
    APIRouter,
    Depends,
    Response,
    HTTPException,
    status,
    Request
)
from queries.accounts import (
    AccountsIn,
    AccountsOut,
    AccountsRepository,
    Error,
    DuplicateAccountError,
)
from typing import Union, List, Optional
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel


class AccountsForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountsOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/accounts", response_model=Union[List[AccountsOut], Error])
def get_all(repo: AccountsRepository = Depends()):
    return repo.get_all()


@router.get(
    "/accounts/{accounts_email}",
    response_model=(Optional[AccountsOut])
)
def get_one_account(
    accounts_email: str,
    response: Response,
    repo: AccountsRepository = Depends(),
) -> AccountsOut:
    accounts = repo.get_one(accounts_email)
    if accounts is None:
        response.status_code = 404
    return accounts


@router.delete("/accounts/{accounts_id}", response_model=bool)
def delete_accounts(
    accounts_id: int,
    repo: AccountsRepository = Depends(),
) -> bool:
    return repo.delete(accounts_id)


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountsIn,
    request: Request,
    response: Response,
    accounts: AccountsRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountsForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountsOut = Depends(authenticator.get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/protected", response_model=bool)
async def get_protected(
    accounts_data: dict = Depends(authenticator.try_get_current_account_data),
):
    return True
