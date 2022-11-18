# Data Model

```plantuml
package "FastAPI apps" <<Frame>> {
    object accounts_service {
    }
    
    object favorites_service {
    }

    object yelp_api_service {
    }
}

package "Users\n(postgreSQL DB)" <<Database>> {
    class users {
        id: serial <<PK>>
        first_name: str
        last_name: str
        email: str
        .. private data ..
        password: str
    }
}

package "Favorites\n(postgreSQL DB)" <<Database>> {
    class favorites {
        id: serial <<PK>>
        user: id
        yelp_api.id: str
    }
}

package "Yelp Fusion API" <<Cloud>> {
  class yelpdetail as "https://api.yelp.com/v3/businesses/{id}" {
    id: string
    name: string
    image_url: string
    location: 
    |_ address1: string
    |_ city: string
    |_ zip_code: string
    |_ country: string
    |_ state: string
    display_phone: string
    open: [
    |_ {
    |_    is_overnight: boolean,
    |_    start: string,
    |_    day: int
    |_ },
    |_ ...
    ]
    coordinates:
    |_ latitude: decimal
    |_ longitude": decimal

  }

  class yelplist as "https://api.yelp.com/v3/businesses/" {
    businesses: [
    |_ {
    |_   id: string
    |_   name: string
    |_   coordinates:
    |_     latitude: decimal
    |_     longitude": decimal
    |_ },
    |_ ...
    ]
  }

}
users }|-left-|{ favorites : M2M
favorites_service <-- favorites : psychopg
accounts_service <-- users : psycopg
yelp_api_service <-- "Yelp Fusion API" : ""
favorites .left. "Yelp Fusion API" : yelp_api[id]
```
