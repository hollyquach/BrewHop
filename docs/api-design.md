# API Design

### Home (/)
* Page Overview
    * Show cards with featured breweries
        * Picture of brewery
        * Name of brewery
        * City, State
<br>

* Brewery Data
    * Database: Open Brewery DB
    * Endpoint path: https://api.openbrewerydb.org/breweries/random?size=3&country=United%20States
    * Endpoint method: GET
    * Response: Brewery data details

    * Response shape:
        ```json
        {
            "name": string,
            "city": string,
            "state": string
        }
        ```
<br>

* Brewery Picture
    * _Still figuring out this piece as we need to explore how to map a result in OBDB to a result in Google_
    * Open Brewery API will return specific breweries and here we will map this brewery to a search in the Google Places API to fetch richer data on that specific location. From these results we can extract an image URL for that place.
    <br/>

    * Database: Google Places
    * Endpoint path:
    * Endpoint method: GET
    * Response: Brewery data details with image

    * Response shape:
        ```json
        {
          "place_id": String,
          "Picture URL": String,
        }
        ```

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
    * Database: Open Brewery DB
    * Endpoint path: TBD
    * Endpoint method: GET
    * Response: Brewery data details

    * Response shape:
        ```json
        {
          "name": String,
          (some piece of the response for matching with Places API, TBD),
          "brewery_type": String
        }
        ```
<br>

* Favorites Data
    * Database: BrewHop Backend (FastAPI)
    * Endpoint path: TBD
    * Endpoint method: GET, POST, DELETE
    * Response: User profile details

    * Response shape:
        ```json
        There is a table containing user id's and brewery id's.
        When user logs in we filter by user id. For filtered entries
        in the table, if brewery id matches id of brewery in the search
        results list, star is highlighted.

        {
          "User ID": Integer,
          "Brewery ID": Integer
        }
        ```
<br>

* Stretch: Richer Data and Mapping
    * Database: Google Places API
    * Endpoint path: TBD
    * Endpoint method: GET
    * Response: Brewery Details

    * Response shape:
        ```json
        {
          "Description": String,
          (Map Data)
        }
        ```
<br>

### Single-Brewery Details (/brewery/detail)
* Page Overview
    * Display the details of one unique selected brewery.
    * Details include: contact info, location info, general information about the brewery, photo, map-snippet, phone, hours
    * Similar to the results list, logged-in users can favorite/unfavorite from this page
<br/>

* Favorites Data
    * Database: BrewHop Backend (FastAPI)
    * Endpoint path: TBD
    * Endpoint method: GET, POST, DELETE (in fastapi these will be different endpoints)
    * Response: User profile details

    * Response shape:
        ```json
        There is a table containing user id's and brewery id's.
        When user logs in we filter by user id. For filtered entries
        in the table, if brewery id matches id of brewery in the search
        results list, star is highlighted.

        {
          "User ID": Integer,
          "Brewery ID": Integer
        }
        ```
<br>

* Stretch: Richer Data and Mapping
    * Database: Google Places API
    * Endpoint path: TBD
    * Endpoint method: GET
    * Response: Brewery Details

    * Response shape:
        ```json
        {
          "place_id": String,
          "name": String,
          "Picture URL": String,
          "formatted_address": String,
          "formatted_phone_number": String,
          "editorial_summary": String,
          "website": String,
          "opening_hours": PlaceOpeningHours,
          "location": LatLngLiteral,
          (Map Data)
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
    * Endpoint path: TBD
    * Endpoint method: POST
    * Response: User profile details

    * Response shape:
        ```json
        {
          "first_name": String,
          "last_name": String,
          "email_address": String,
          "password": String
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
    * Endpoint path: TBD
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
