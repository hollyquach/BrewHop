from main import app
from fastapi.testclient import TestClient
from queries.accounts import AccountsRepository


client = TestClient(app)

test_users = {
    "id": 18,
    "first_name": "str",
    "last_name": "str",
    "email": "str",
}


class EmptyAccountsRepository:
    def get_one(self, user_id: int):
        return test_users


def test_get_one_user_by_id():

    app.dependency_overrides[AccountsRepository] = EmptyAccountsRepository

    response = client.get("/accounts/18")

    assert response.status_code == 200
    assert response.json() == test_users

    app.dependency_overrides = {}
