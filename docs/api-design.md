## API Design
API Design (Updated 12/12/22)
*See collapse at bottom of document for initial planning API design*

### Yelp API Service
API Reference: https://brewhop-yelp-api-service.onrender.com/redoc

* Hits Yelp Fusion API with parameters passed from Front-End inputs to return data based on brewery search parameters
* Built on FastAPI
* Runs within a Docker container deployed on Render.com
</br>

### Accounts Service
API Reference: https://brewhop-accounts-service.onrender.com/redoc

* Stores and returns user account data for the entire site
* Utilizes JWT token authentication
* Built on FastAPI
* Runs within a Docker container deployed on Render.com
* Stores and queries data from a PostgreSQL database running on ElephantSQL.com

### Favorites Service
API Reference: https://brewhop-favorites-service.onrender.com/redoc

* Stores and returns user favorites data for the entire site
* Built on FastAPI
* Runs within a Docker container deployed on Render.com
* Stores and queries data from a PostgreSQL database running on ElephantSQL.com
</br>

<details><summary>API Design (Historical, from initial project planning)</summary>

### Home (/)
* Page Overview
    * Show cards with featured breweries
        * Picture of brewery
        * Name of brewery
        * City, State
<br>

* Brewery Data
    * Database: Yelp API
    * Endpoint parameters: Dictionary of major cities
    * Endpoint path: https://api.yelp.com/v3/businesses/search?location={city}+{state}+US&categories=breweries&limit=3
    * Endpoint method: GET
    * Response: List of breweries in featured major city

    * Response shape:
        ```json
      {
        "businesses": [
          {
            "id": string,
            "name": string,
            "image_url": string
          },
          ...
        ]
      }
        ```
<br>

### Search Results List (/search)
* Page Overview
    * Display a list of results from search term
    * search term is city and state of brewery
    * Results list is paginated (limited no. per call)
    * If user is logged-in, star will show for each entry that user has previously added to favorites list.
      * User has option to add list entry to their favorites list by clicking star, at which point grey star turns to gold.
    <br/>
    * Stretch Goal: Display map on right side of page next to results list
<br>

* Brewery Data
    * Database: Yelp API
    * Endpoint path: https://api.yelp.com/v3/businesses/search?location={city}+{state}+US&categories=breweries
    * Endpoint method: GET
    * Response: List of breweries in city, state searched

    * Response shape:
        ```json
      {
        "businesses": [
          {
            "id": string,
            "name": string,
            "coordinates.latitude": decimal,
            "coordinates.longitude": decimal
          },
          ...
        ]
      }
        ```
<br>

* Favorites Data
    * Database: BrewHop Backend (FastAPI)
    * Endpoint path: /favorites
    * Endpoint method: GET, POST, DELETE
    * Response: List of favorites for logged-in user
    * Response shape defined below in _favorites_ section
<br>

### Single-Brewery Details (/brewery/detail)
* Page Overview
    * Display the details of one unique selected brewery.
    * Details include: contact info, location info, general information about the brewery, photo, map-snippet, phone, hours
    * Similar to the results list, logged-in users can favorite/unfavorite from this page
<br/>

* Favorites Data
    * Database: BrewHop Backend (FastAPI)
    * Endpoint path: /favorites
    * Endpoint method: GET, POST, DELETE
    * Response: List of favorites for logged-in user
    * Response shape defined below in _favorites_ section
<br>

* Brewery Detailed Data
    * Database: Yelp API
    * Endpoint path: https://api.yelp.com/v3/businesses/{id}
    * Endpoint method: GET
    * Response: Brewery Details

    * Response shape:
        ```json
        {
          "id": string,
          "name": string,
          "image_url": string,
          "location": {
            "address1": string,
            "city": string,
            "zip_code": string,
            "country": string,
            "state": string,
          },
          "display_phone": string,
          "open": [
            {
              "is_overnight": false,
              "start": string,
              "end": string,
              "day": int
            },
            ...
          ],
          "location": LatLngLiteral,
          "coordinates": {
            "latitude": decimal,
            "longitude": decimal
          },
        }
        ```
<br>

### Sign Up Form
* Page Overview
    * Allows user to sign up for a new account
    * Not actually a separate page, but rather a modal
    * Shows fields for first name, last name, email address, and password
    * Logs user in after successful account creation
    <br/>

* User Data
    * Database: BrewHop Backend (FastAPI)
    * Endpoint path: /user
    * Endpoint method: POST
    * Response: User profile details

    * Response shape:
        ```json
        {
          "first_name": string,
          "last_name": string,
          "email_address": string,
          "password": string
        }
        ```
<br>

### Login Form
* Page Overview
    * Allows user to login to their existing account
    * Not actually a separate page, but rather a modal
    * Shows fields for email address and password
    <br/>

* User Data
    * Database: BrewHop Backend (FastAPI)
    * Endpoint path: /user
    * Endpoint method: POST, GET
    * Response: User profile details

    * Response shape:
        ```json
        {
          "email_address": String,
          "password": String
        }
        ```
<br>

### User Favorites List
* Favorites Data
    * Database: BrewHop Backend (FastAPI)
    * Endpoint path: /favorites
    * Endpoint method: GET, DELETE
    * Response: Brewery favorites per logged-in user

    * Response shape:
        ```json
        {
          "pk": serial,
          "user": int,
          "yelp_id": string
        }
        ```
<br>
</details>
