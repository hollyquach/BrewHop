from pydantic import BaseModel
from typing import Union, List
from queries.pool import get_conn


class Error(BaseModel):
    message: str


class FavoriteIn(BaseModel):
    user_id: int
    yelp_id: str


class FavoriteOut(BaseModel):
    id: int
    user_id: int
    yelp_id: str


class FavoriteRepository:
    def get_all(self) -> Union[Error, List[FavoriteOut]]:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        SELECT id, user_id, yelp_id
                        FROM favorites;
                        """
                )
                return [
                    FavoriteOut(
                        id=entry[0],
                        user_id=entry[1],
                        yelp_id=entry[2],
                    )
                    for entry in db
                ]
        except Exception:
            return {"message": "Could not retrieve favorites."}

    def get_all_for_user(
        self, user_id: int
    ) -> Union[Error, List[FavoriteOut]]:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        SELECT id, user_id, yelp_id
                        FROM favorites
                        WHERE user_id = %s;
                        """,
                    [user_id],
                )
                return [
                    FavoriteOut(
                        id=entry[0],
                        user_id=entry[1],
                        yelp_id=entry[2],
                    )
                    for entry in db
                ]
        except Exception:
            return {"message": "Error!"}

    def create(self, favorite: FavoriteIn) -> FavoriteOut:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                result = db.execute(
                    """
                        INSERT INTO favorites
                            (user_id, yelp_id)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                    [favorite.user_id, favorite.yelp_id],
                )
                id = result.fetchone()[0]
                old = favorite.dict()
                return FavoriteOut(id=id, **old)
        except Exception:
            return {"message": "Could not create favorite"}

    def delete(self, id: int) -> bool:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        DELETE FROM favorites
                        WHERE id = %s
                        """,
                    [id],
                )
                return True
        except Exception:
            return False
