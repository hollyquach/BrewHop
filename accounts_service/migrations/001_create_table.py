steps = [
    [
        ## create the table
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
<<<<<<< HEAD
            hashed_password VARCHAR(255) NOT NULL
=======
            password VARCHAR(255) NOT NULL
>>>>>>> main
        );
        """,
        ## drop the table
        """
        DROP TABLE accounts;
        """
    ]
]