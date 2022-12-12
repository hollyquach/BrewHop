steps = [
    [
        """
        CREATE TABLE favorites (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL,
            yelp_id VARCHAR(1000) NOT NULL
        );
        """,
        """
        DROP TABLE favorites;
        """
    ]
]
