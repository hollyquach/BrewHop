from pydantic import BaseModel, AnyUrl
import time


# Home Page Return
class FeaturedLsItem(BaseModel):
    id: str # yelp_id -> 
    name: str
    image_url: AnyUrl
    # location: LocationLst


class FeaturedList(BaseModel):
    businesses: list[FeaturedLsItem]


class FeaturedBreweries(BaseModel):
    location: str
    breweries: list[dict]

# Search Results Return
class BreweryLsItem(BaseModel):
    id: str
    name: str
    coordinates: dict


class BreweriesList(BaseModel):
    businesses: list[BreweryLsItem]


# Detail Page return
class BreweryDetailPage(BaseModel):
    id: str
    name: str
    ## stretch goal to include other categories for that business
    image_url: AnyUrl
    # location: dict
    address: list[str]
    display_phone: str
    open: list[str]
    latitude: float
    longitude: float
    # coordinates: dict

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
    print(f'📆📆📆\n{weekday}: {start} - {end}')
    return f'{weekday}: {start} - {end}'