# Data Model

```plantuml
package "FastAPI apps" <<Frame>> {
    object accounts_service {
        https://brewhop-favorites-service.onrender.com/
    }
    object favorites_service {
        https://brewhop-accounts-service.onrender.com/
    }
    object yelp_api_service {
        https://brewhop-favorites-service.onrender.com/
    }
}

package "User Interface" <<Frame>> {
    object ReactApp {
        https://brewhoppers.gitlab.io/brew-hop/
    }
}

package "Users\n(postgreSQL DB)" <<Database>> {
    class users {
    }
}

package "Favorites\n(postgreSQL DB)" <<Database>> {
    class favorites {
    }
}

package "Yelp Fusion API" <<Cloud>> {
  class yelpdetail as "https://api.yelp.com/v3/businesses/{id}" {
  }
  class yelplist as "https://api.yelp.com/v3/businesses/" {
  }
}

ReactApp --> "FastAPI apps": .
users }|-left-|{ favorites : M2M
favorites_service <-- favorites : psychopg
accounts_service <-- users : psycopg
yelp_api_service <-- "Yelp Fusion API" : ""
favorites .left. "Yelp Fusion API" : yelp_api[id]

```
