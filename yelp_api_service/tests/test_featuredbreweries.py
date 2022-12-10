from fastapi.testclient import TestClient
from main import app
from unittest.mock import patch


client = TestClient(app)


def test_get_featured():
    # Mock the `yelprequest` method
    with patch('routers.yelpAPI.yelprequest') as mock_yelprequest:
        # Set the return value for the mocked method
        mock_yelprequest.return_value = {
            "businesses": [
                {
                    "id": "123",
                    "name": "Brewery 1",
                    "image_url": "https://example.com/brewery1.jpg"
                },
                {
                    "id": "456",
                    "name": "Brewery 2",
                    "image_url": "https://example.com/brewery2.jpg"
                },
                {
                    "id": "789",
                    "name": "Brewery 3",
                    "image_url": "https://example.com/brewery3.jpg"
                }
            ]
        }

        # Make a GET request to the router and get the response
        response = client.get("/api/featured")

        # Assert that the response has a 200 status code
        assert response.status_code == 200

        # Assert that the response is a JSON object with the expected keys
        assert "location" in response.json()
        assert "breweries" in response.json()

        # Assert that the "breweries" key is a list of length 3
        assert len(response.json()["breweries"]) == 3

        # Assert that each element in the "breweries" list is a dictionary
        # with the expected keys
        assert all(
            "id" in brewery
            and "name" in brewery
            and "image_url" in brewery
            for brewery in response.json()["breweries"]
        )
