from fastapi.testclient import TestClient
from main import app
from routers.yelpAPI import getyelprequest

client = TestClient(app)


def clone_yelprequest(url, url_params):
    example_response = {
        "businesses": [
            {
                "id": "-AAI9NlFqavkQvPBWFd0CQ",
                "alias": "rachels-ginger-beer-pike-place-market-seattle",
                "name": "Rachel's Ginger Beer - Pike Place Market",
                "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/",
                "is_closed": False,
                "url": "https://www.yelp.com/biz/rachels-ginger-beer-pike",
                "review_count": 1340,
                "categories": [{"alias": "breweries", "title": "Breweries"}],
                "rating": 4.5,
                "coordinates": {
                    "latitude": 47.6095109038757,
                    "longitude": -122.341372000061,
                },
                "transactions": ["delivery"],
                "price": "$$",
                "location": {
                    "address1": "1530 Post Aly",
                    "address2": None,
                    "address3": "",
                    "city": "Seattle",
                    "zip_code": "98101",
                    "country": "US",
                    "state": "WA",
                    "display_address": ["1530 Post Aly", "Seattle, WA 98101"],
                },
                "phone": "",
                "display_phone": "",
                "distance": 1822.6506262726266,
            },
            {
                "id": "lxeERc31ze0b6mdERsqjbw",
                "alias": "fremont-brewing-seattle-3",
                "name": "Fremont Brewing",
                "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/",
                "is_closed": False,
                "url": "https://www.yelp.com/biz/fremont-brewing-seattle-3",
                "review_count": 892,
                "categories": [
                    {"alias": "breweries", "title": "Breweries"},
                    {"alias": "beergardens", "title": "Beer Gardens"},
                ],
                "rating": 4.5,
                "coordinates": {
                    "latitude": 47.6490599,
                    "longitude": -122.3444326
                },
                "transactions": [],
                "price": "$$",
                "location": {
                    "address1": "1050 N 34th St",
                    "address2": "",
                    "address3": None,
                    "city": "Seattle",
                    "zip_code": "98103",
                    "country": "US",
                    "state": "WA",
                    "display_address": ["1050 N 34th St", "Seattle,WA 98103"],
                },
                "phone": "+12064202407",
                "display_phone": "(206) 420-2407",
                "distance": 2712.412453542274,
            },
            {
                "id": "x8BFKHu7ajvXLOA0_33bbg",
                "alias": "old-stove-brewing-seattle-3",
                "name": "Old Stove Brewing",
                "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/",
                "is_closed": False,
                "url": "https://www.yelp.com/biz/old-stove-brewing-seattle-3",
                "review_count": 913,
                "categories": [
                    {"alias": "brewpubs", "title": "Brewpubs"},
                    {"alias": "seafood", "title": "Seafood"},
                    {"alias": "burgers", "title": "Burgers"},
                ],
                "rating": 4.5,
                "coordinates": {
                    "latitude": 47.60947174117716,
                    "longitude": -122.34255894939054,
                },
                "transactions": ["delivery", "pickup"],
                "price": "$$",
                "location": {
                    "address1": "1901 Western Ave",
                    "address2": "Ste A",
                    "address3": None,
                    "city": "Seattle",
                    "zip_code": "98101",
                    "country": "US",
                    "state": "WA",
                    "display_address": [
                        "1901 Western Ave",
                        "Ste A",
                        "Seattle, WA 98101",
                    ],
                },
                "phone": "+12066026120",
                "display_phone": "(206) 602-6120",
                "distance": 1850.2897834848359,
            },
        ],
        "total": 84,
        "region": {
            "center": {
                "longitude": -122.33551025390625,
                "latitude": 47.62541904760501
            }
        },
    }
    return example_response


def clone_getyelprequest():
    return clone_yelprequest


def test_search_breweries():
    """Tests get_brewery_list() endpoint
    transforms response of Yelp API request
    as expected & returns 200 status code
    """
    app.dependency_overrides[getyelprequest] = clone_getyelprequest

    response = client.get("/api/breweries?city=seattle&state=wa")

    expected_response = {
        "businesses": [
            {
                "latitude": 47.6095109038757,
                "longitude": -122.341372000061,
                "name": "Rachel's Ginger Beer - Pike Place Market",
                "yelp_id": "-AAI9NlFqavkQvPBWFd0CQ",
            },
            {
                "latitude": 47.6490599,
                "longitude": -122.3444326,
                "name": "Fremont Brewing",
                "yelp_id": "lxeERc31ze0b6mdERsqjbw",
            },
            {
                "latitude": 47.60947174117716,
                "longitude": -122.34255894939054,
                "name": "Old Stove Brewing",
                "yelp_id": "x8BFKHu7ajvXLOA0_33bbg",
            },
        ]
    }

    assert response.status_code == 200
    assert response.json() == expected_response

    app.dependency_overrides = {}
