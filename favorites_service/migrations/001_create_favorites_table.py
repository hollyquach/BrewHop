steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE favorites (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL,
            yelp_id VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE favorites;
        """
    ]
]
