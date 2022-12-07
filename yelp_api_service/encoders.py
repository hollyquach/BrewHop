from pydantic import BaseModel, AnyUrl, Field
import time


# Home Page | data parser
class FeaturedLsItem(BaseModel):
    id: str # yelp_id
    name: str
    image_url: AnyUrl

class FeaturedList(BaseModel):
    businesses: list[FeaturedLsItem]

# Home Page | return validator
class FeaturedBreweries(BaseModel):
    location: str
    breweries: list[dict]

# Search results | data parser
class BreweryLsItem(BaseModel):
    yelp_id: str = Field(..., alias='id')
    name: str
    latitude: float
    longitude: float

    def __init__(self, **kwargs):
        kwargs["latitude"] = kwargs["coordinates"]["latitude"]
        kwargs["longitude"] = kwargs["coordinates"]["longitude"]
        super().__init__(**kwargs)

class BreweriesList(BaseModel):
    businesses: list[BreweryLsItem]

# Search results | return validator
class BreweryLsItemOut(BaseModel):
    yelp_id: str
    name: str
    latitude: float
    longitude: float

class BreweriesListOut(BaseModel):
    businesses: list[BreweryLsItemOut]

# Detail Page return
class BreweryDetailPage(BaseModel):
    id: str
    name: str
    image_url: AnyUrl
    address: list[str]
    display_phone: str
    open: list[str]
    latitude: float
    longitude: float

    class Config:
        orm_mode: True


def convert_hours(day_hours):
    '''
    Given a dictionary of day, start & end from Yelp API Business open hours details,
    returns a string with the week day and open hours (12 hour format)
    '''
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    weekday = days[day_hours['day']]
    start = time.strftime('%I:%M %p', time.strptime(day_hours['start'], '%H%M'))
    end = time.strftime('%I:%M %p', time.strptime(day_hours['end'], '%H%M'))
    return f'{weekday}: {start} - {end}'
