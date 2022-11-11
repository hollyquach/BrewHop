#API Design

###Home (/)
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
    * Database: Google Places
    * Endpoint path:
    * Endpoint method: GET
    * Response: Brewery data details with image

    * Response shape:
        ```json
        {

        }
        ```


###Search Results List (/search)

###Single-Brewery Details (/brewery/detail)

###Sign Up Form

###Login Form

###User Favorites List







### Get a list of Tweets

* Endpoint path: /tweets
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of Tweets
* Response shape:
    ```json
    {
      "tweets": [
        {
          "account_name": string,
          "avatar_url": string,
          "text": string,
          "image_url": string,
          "likes": number
        }
      ]
    }
    ```
