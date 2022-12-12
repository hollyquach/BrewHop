## December 12, 2022

Today I will work on:

* Final Readme work
* Demo with instructors

Over the weekend worked some with the team to get our final app finished up. I did some code cleanup to get rid of any lingering comments, commented-out code, print and console.log statements, etc. I also added an image to our 404 invalid page and debugged why it wasn't working initially.

I'm writing my journal entry for today in the morning because we're about to merge our journals into main and would prefer not to touch our code base later in the day if possible. At present, our code is all functional and we have fixed the outstanding bugs.

I am very proud of our team and the work that we have accomplished over the course of this project.

## December 9, 2022

Today I worked on:

* Writing and debugging unit testing
* Refactoring backend favorites API to have transaction autocommit feature for ElephantSQL

I wrote my unit test for the favorites service. It checks that the response of a search for favorites by user returns valid data. It took me some trial and error but I got it working after realizing that the test response dictionary had to be contained within a list. The hardest part was getting the authentication requirement to access this endpoint to override properly with a test dummy user. After some discussion with and help from the group we got it to work properly. It now runs and passes whenever the pipeline runs in Gitlab.

We needed to refactor our backend queries files to incorporate Daniel's changes to transaction autocommit. It is frustrating that we have had to refactor this twice since initially building what was covered in Learn, but we've been successful each time. I helped Yanning work on the refactor for the accounts service and did my own for the favorites service. Now when querying the data in ElephantSQL, we can see that it is in place as expected, so we don't lose accounts and favorites after a brief time.

## December 8, 2022

Today I worked on:

* Adding loaders to signup and login forms
* Adding error handling to signup and login forms
* Refactoring CSS for footer to match original styling (lost in a merge)
* Fixing issue from duplicate site manifest, updating icon links to include %public_url% reference

After deployment we realized how slow our backend operates given the free tier of render.com. It became clear that the UI needed elements to indicate something was in fact happening since the login or signup processes took a long time and didn't appear to be doing anything. I re-engineered the forms for these to include spinners which show in place of the submit button for the signup and login while in process. This also made it easier to show the error messages for these forms which I had created earlier but punted the implementation of to a stretch goal. Now it checks if the token is valid and the response includes a user's credentials before flipping login status. Otherwise an error is shown and the form doesn't dismiss.

At some point during one of our messier merges, we had lost the CSS for the footer and the text wasn't displaying properly. I found this and reimplimented it.

Lastly there was an issue from the icon generator I'd used which put in a duplicate site_manifest file. This was causing some issues so we got rid of it and made sure the changes necessary were implemented in the existing React manifest. I also added the url variable to all of the icon links so we would ensure to display them all properly.

## December 7, 2022

Today I worked on:

* Getting prep work done for deployment readiness
* Group work on building deployment files
* Merges

We did a few rounds of merges to get everyone on the same code and ensure that everyone was on the lastest code, resolve conflicts, and make sure everything's working. We encountered some bugs in the process which we worked through, fixed, and then remerged.

With everyone on the latest code, we were able to get going on tasks related to CI/CD. Our first step was to do some general prep to get ready. We updated our connection pools on the backend APIs to the new method suggested by the teachers. Tested, and ensured it was all still working. We also updated environment variables.

Next we, as a group, started building Dockerfiles for deployment, and the Gitlab yaml file. We discovered that a number of linter/formatting issues were causing us to not pass those tests, so we spent some time as a group cleaning up and reformatting files. After our cleanup, we uncovered some more issues where our token's useEffect was pinging a number of times and causing our current set logged-in user to reset to null. We worked on this until pretty late and decided to reconvene in the morning.

## December 6, 2022

Today I worked on:

* Getting current logged-in user passed into state from token response to all appropriate components
* Getting certain elements of state to persist through a refresh

I'd thought originally that getting the logged-in user stored into state from the login response would be simple but as the response only passes back token info, it proved much more complicated than I'd anticipated. It required a second backend hit to get account details based on a certain credential for a specific user (email). After some trial and error I got it working in a response from the useToken file which then returns the credentials down to the component using this for login.

The next issue which came up was getting this data to persist through a refresh. This was a big bug because if we lose that data, then all of our functionality for favorites becomes bricked. A big win was discovering a third party library which implements hook variations which will store this in the broser. I had struggled at first with trying to implement it on my own without these external hooks, but once I discovered this it solved a lot of issues. This was also great because it allowed us to plug this into other hooks preserving more data through a refresh, which makes our site more polished.

## December 5, 2022

Today I worked on:

* Pair programming to review my weekend work with team
* Troubleshooting auth/login/signup functionality issues
* Merge conflict resolution

Over the weekend I was able to build out the modals containing Yanning's login and signup forms. The hooks to show and hide the modals are working and passing through from component to component properly. We started testing the forms together and discovered some issues though remaining with the login and signup functionality and began troubleshooting. We lost a lot of work time today due to test review, but in the evening the group came together and fixed the issues with auth. It took a while for us to figure it out but the breakthrough was figuring out how to pass the custom hook of `useToken()` into the React which calls the functions. We got there in the end and it was a huge win! After, we solved merge conflicts and completed a merge request to push the code into main. Everyone else then merged in their respective branches, and we're much farther along now on our main branch.

## December 2, 2022

Today I worked on:

* Solving merge issues

We began to work again as pair programming, but found that we had some buggy code floating around our merges. We each had working branches but when merging main into our branch before merging the branch back into main we'd discover new issues each time. We were able to solve all of the issues and they all ended up being trivial mistakes caused from working on code too late at night. Happy that we all now have a working code basis to continue building onto, and will spend some time over the weekend trying to make up the tasks we had meant to do today.

## December 1, 2022

Today I worked on:

* Refactoring event handlers for search to pass state properly up to main app

The big breakthrough of the day was figuring out why state wasn't being passed from my search up to the main app. The reason is that the search button needed a preventdefault command added to keep it from hard refreshing the app. Once I figured this out I spent a little bit of time struggling with getting usenavigate to work. In the end I realized how to make it work, by setting it to a variable and calling that variable. Once I got all of this working, my search feature ran perfectly.

## November 30, 2022

Today I worked on:

* Search feature props passing through
* Playing with useNavigate and trying to get states passed through

I was a little bit frustrated with our schedule today because after the lectures we weren't left with much time to work in the day. That said, I figured out how to get the useState props passed from component to sub-component, to sub-component, etc. (my structure is pretty nested). So my search feature is setting the search parameters as you type, and the dropdown is passing the abbreviation, for each fully-named state in the list. But now I need to figure out why that info isn't being passed through the useNavigate function when we route to the results page.

## November 29, 2022

Today I worked on:

* Continuing to build the search sub-component

I had some breakthroughs today. One big one was getting my drop down with a list of US states to populate from a json file that I had installed into the React app. Another was on reviewing the useState video, my understanding is stronger. We will need to do some merge work to get some other pieces in place for me to test things out but I think I'm a lot closer than I was yesterday.


## November 28, 2022

Today I worked on:
 
* Pair programming
* Working on building nav bar and search

Over the long weekend I'd carved out just a little work time and got started on the nav bar. I build a basic structure for it. Today I continued that work by building out the sub-component for the search feature. I was realizing the need to really review hooks as my knowlege of useState was not where I was actually hoping it would be.

## November 23, 2022

Today I worked on:

* Team planning for React routes and components

We worked collectively to plan out the structure of our React components, how we wanted to lay out the routes, and what components would be in which files.

## November 22, 2022

Today I worked on:

* Correcting my remaining endpoint to search by user_id only
* Troubleshooting a server error with this endpoint
* Presenting endpoint/function/backend work to the team
* Helping the team determine how best we can generate City selection data for our Featured list on our homepage

After changing strategy slightly, I was able to refactor the remaining favorites endpoint to search by a user_id. The trouble was that it still wasn't working properly. After some group troubleshooting we figured out that frustratingly the issue was just a missing set of empty parentheses. Once that was fixed we worked on some of the API endpoint construction for our homepage featured list.

## November 21, 2022

Today I worked on:

* Continuing to troubleshoot my get single favorite endpoint

Unfortunately I had an afternoon doctor's appointment and wasn't able to spend too much time on this before having to break off for the day. Upon syncing with my team I did come to realize that I may not need to search by multiple parameters as we can load all of a user's favorites into state on login, and filter from there.

## November 18, 2022

Today I worked on:

* Finishing up the favorites endpoints and functions

I was able to get all of the endpoints working except for the "get single favorite entry" function. I was trying to return entries by multiple parameters and was returning an internal server error.

A moment of realization was figuring out that serial ID would be ok for the delete function of a favorites entry, as the full data for each favorites entry, including id, will be stored in state from loading the page on login.

## November 17, 2022

Today I worked on:

* Finishing out the build of the docker-compose to include the favorites microservice
* Project planning of the initial backend building with team

We completed the Docker setup to get our second microservice (favorites) up and running. Much of the afternoon was spent in a lecture on Git workflow so that left a little less overall work time. After finishing Docker setup, we moved on to some group planning to determine that Holly and Sean would work on setting up the external API integration, and Yanning and I would get going on setting up some of the FastAPI structure.

## November 16, 2022

Today I worked on:

* Getting our API documentation revised to reflect the use of the Yelp API
* Working on getting our Docker compose file constructed

After presenting to James early in the week we came to the realization that it makes more sense to just use Yelp's API than to plug multiple external databases into each other. After this pivot we revisited our documentation to ensure that the API planning was all up to date.

We started to build our Docker compose file to get the basis of our app up and running. We struggled for a while getting a syntax error fixed but eventually got there.

## November 15, 2022

Today I worked on:

* Group planning of tasks, questions, and feature-construction

Our group focused on building out our project board to project manage the remainder of the project.
