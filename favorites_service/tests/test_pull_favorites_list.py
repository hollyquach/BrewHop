from main import app
from fastapi.testclient import TestClient
from queries.favorites import FavoriteRepository
from authtoken import get_current_user

client = TestClient(app)

test_favorite_out = [
    {
        "id": 1,
        "user_id": 1,
        "yelp_id": "abc123",
    }
]


class TestFavoriteRepository:
    def get_all_for_user(self, user_id: int):
        return test_favorite_out


class FakeUser:
    def make_fake_user(token: str):
        return {}


def test_get_all_favorites_for_user():
    app.dependency_overrides[FavoriteRepository] = TestFavoriteRepository
    app.dependency_overrides[get_current_user] = FakeUser

    response = client.get("/favorites/1")

    assert response.status_code == 200
    assert response.json() == test_favorite_out

    app.dependency_overrides = {}
