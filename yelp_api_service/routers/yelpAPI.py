import requests
import os
from fastapi import APIRouter
from encoders import *
import random
import json


# [] update API key call for deployment -> currently passing in key & calling from env

router = APIRouter()

api_key = os.getenv("YELP_API_KEY")

# > create variables for search URL
# Featured & Search | https://api.yelp.com/v3/businesses/search?{params}
# Brewery | https://api.yelp.com/v3/businesses/{id}
API_HOST = "https://api.yelp.com"
SEARCH_PATH = "/v3/businesses/search"
BUSINESS_PATH = "/v3/businesses/"


def yelprequest(url, url_params):
    """
    Given your URL and search parameters, sends a GET request to the Yelp API
    Formats request header with api_key passed into env
    Returns the response as json
    """
    headers = {
        "Authorization": "Bearer %s" % api_key,
    }
    try:
        response = requests.request("GET", url, headers=headers, params=url_params)
        response.raise_for_status()
        
        return response.json()

    except requests.exceptions.HTTPError as err:
        raise SystemExit(err)

@router.get("/api/breweries", response_model=BreweriesListOut)
async def get_brewery_list(
    # search by city/state inputs from user
    city: str,
    state: str,
):
    """
    Given a city & state,
    Returns a list of 50 breweries around that city:
        {
            "businesses": [
                {
                    "id": yelp ID
                    "name": brewery name
                    "coordinates": {
                        "latitude": latitude of the brewery location
                        "longitude": longitude of the brewery location
                    }
                }
                ...
            ]
        },

    """
    # input parameters yelp API request -> limit is capped at QTY 50
    url = API_HOST + SEARCH_PATH
    url_params = {
        "categories": "breweries",
        "is_closed": False,
        "location": f"{city}+{state}+US",
        "limit": 50, 
    }

    result = yelprequest(url, url_params)

    result = BreweriesList.parse_obj(result).dict()

    return result


@router.get("/api/featured", response_model=FeaturedBreweries)
async def get_featured():
    """
    Returns a dictionary with a featured location and list of 3 breweries for that location:
        {
            "location": Featured location
            "breweries": [
                {
                "id": yelp ID
                "name": brewery name
                "image_url": image URL
                },
                ...
            ]
        }
    """

    # selects featured city from topcities.json to display
    with open("assets/topcities.json", "r") as file:
        data = json.load(file)
    pick = random.choice(data["topcities"])
    city = pick["city"]
    state = pick["state"]
    location = f"{city}, {state}"

    url = API_HOST + SEARCH_PATH

    url_params = {
        "categories": "breweries",
        "is_closed": False,
        "location": f"{city}+{state}+US",
        "limit": 3,
    }

    result = yelprequest(url, url_params)

    # parsing return data to include location & required info
    result = FeaturedList.parse_obj(result).dict()

    result = {"location": location, "breweries": result["businesses"]}

    return result


# > API endpoint for specific brewery detail -> response BreweryDetailPage
@router.get("/api/brewery", response_model=BreweryDetailPage)
async def get_brewery_detail(yelp_id: str):
    """
    Given a yelp ID,
    Returns the details of the brewery:
        {
            "id": yelp ID
            "name": brewery name
            "image_url": image URL
            "address": list with the street address & city/state/zip
            "display_phone": phone number
            "open": list of the open hours for each day
            "latitude": latitude of the brewery location
            "longitude": longitude of the brewery location
        }
    """

    url = f"{API_HOST}{BUSINESS_PATH}{yelp_id}"

    result = yelprequest(url, url_params=None)

    # convert format of hours from return to a list of strings of open hours for each day
    openhours = [convert_hours(day) for day in result["hours"][0]["open"]]

    # adding nested data to results dictionary for return to reduce reformatting later
    result["open"] = openhours
    result["address"] = result["location"]["display_address"]
    result["latitude"] = result["coordinates"]["latitude"]
    result["longitude"] = result["coordinates"]["longitude"]

    return result
