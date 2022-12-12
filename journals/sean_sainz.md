## November 16th

Worked with group to estabished correct API docs, and pushed those to api_docs in main.

## November 17th

After Andrew's lecture on git, started on this Journal entry to practice with merge requests and managing branches.

## November 18th

Worked to holly to create the basis for our yelpAPI fetch for our first router. Inside yelp_api_service -> routers -> yelpAPI. We troubleshooted and did most of our research figuring out how to pull 
3rd part api's into our file to then use a router with it. We concluded with it not working 100% but we we're able to get the 3rd pary API endpoint to ping correctly. Our next steps is to filter out the data we want inside of our call on Monday.

## Novermber 21st

Majority of our time today was spent pair programming, currently facing a blocker of trying to transform the data we recieve from our 3rd party API with pydantic models. We are unsure due to the aspect of were not exactly creating tables for our data. Since the data is not in our local DB.

## November 22nd

Completed me and Holly's endpoints for our 3rd party API. Each endpoint fetches what we need. We overcame blockers such as filtering out what key, values we want using pydantic and included a random selector for our "featured breweries" feature. We solved this by mostly modifying our pydantic models. Seems like FastAPI needs to be very specific in naming convention for kwargs.

## November 28

Spent majority of the day merging our features together. We had to go through alot of merge conflicts and came to a realization of how our merging was not best practice. Other than that spent time with Yaning trying to help debug the JWT Auth that was given to use.

## November 29

Worked with Holly to figure out best practices for passing useState hooks into elements as props. 

## November 30th

Finalized details component and got a leaflet interactive map to work for our details page. Moving on to next component and starting on my unit test.

## December 1st

Finalized the detailed view of our website. Working with team to got over blockers of authorization and search function. Currently, we have two imput boxes to select a state and type a city, however they are not: saving to state correctly and not persisting after refresh.

## December 2nd

Worked with the group and closely with Jeff to merge his work into main. Afterwards created a new branch to begin working on our main landing page, Featured.

## December 3rd-4th (Weekend)

Started working on our landing page. Passing 3rd party API data, using environment variables, formatting, passing state, and some scss styling.

## December 5th

Learned that our project needed to be entirely refactored to use environment variables for our public urls. We learned that having hardcoded URLS will be troublesom for deployment.

## December 6th

Finished our landing page, which includes react bootstrap cards, an api call and manipulation of data to display three random breweries from yelpAPI, which is in our backend. Also added styling for cards including hover effects, onClick's, and smooth transition loaders and animations. [Link to commit/merge](https://gitlab.com/brewhoppers/brew-hop/-/commit/834495c659882bcef6af648406236ef9725ad329)

## December 7th

Worked with group to debug important blocker of of JWT and Auth implementation, worked closely with seirs to established a path to get past that blocker.

## December 8th

After our "favorites" functionality was implemented from getting past yeserdays blocker, I took the task of adding/deleting favorites to our userFavorites database. This included creating onClick functionality for a universal button component to post and delete in our userfavorites. [Link to commit/merge](https://gitlab.com/brewhoppers/brew-hop/-/commit/62970254c5eb2c7a33b53ad7b769c9ac5dc2b744)

## December 9th

Tasked with refactoring my initial detailed view for a single brewery. My styling was not very stable, so I refactored it to use react-bootstrap-cards modules. This was to ensure that every detailed view of a brewery was dynamic across screen size. We also managed to get our deployment running after a long night of troubleshooting.
We needed to manually deploy.

## December 10th

With our site deployed, the last part was my unit test. Here is my completed unit test, which passes pytest and the pipeline. It tests one of me and Holly's 3rd party endpoints that gets three random breweries. I wrote the test to check the data we get from the call is parsed correctly to get only what we need. [commit/merge](https://gitlab.com/brewhoppers/brew-hop/-/commit/26256ca3bd3b233a275cc5b820ab57dea9e43fdb)

## December 11th 

Fixed issue [#86](https://gitlab.com/brewhoppers/brew-hop/-/issues/86) for nested button error, cleaned up some console.logs and excess comments.

## December 12th

Made a few finishing touches on the details page components, some things were off like scss styling.
