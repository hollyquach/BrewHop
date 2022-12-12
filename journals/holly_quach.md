# Holly Quach - Mod 3 Journal

## CW50


### [W18D1](#W18D1) | 2022.12.12  
<details><summary>Details</summary>

🖥 
- Updating README & docs
- Working on merging in journal entries into main
- Demo project with instructors

</details>


## CW49


### [W17D7](#W17D7) | 2022.12.11  
<details><summary>Details</summary>

🖥 
- Cleaned up favorites feature fix & merge in !53
- Updated useToken & logic to remove 401 unauthrorized errors !54

📐 Updated loginStatus to with handle submit on logout and added as a conditional for requesting tokens

💡 Don't put off so many journal entries....

</details>


### [W17D6](#W17D6) | 2022.12.10  
<details><summary>Details</summary>

🖥 
- Refactored / created favorites context
- Finally found the fix to 
📐  

💡 Finally got a fix in for storing favorites with names into local storage
🪞 REMINDER ON HOW PROMISES WORK 🤦🏻‍♀️
💫 Learned a lot about using context / context providers & custom hooks

</details>


### [W17D5](#W17D5) | 2022.12.09  
<details><summary>Details</summary>

🖥 
- Spent most of the day trying to figure out the favorites names issue
- Created merge request for unit test on !38 & added to pipeline

👾 Favorites data not storing into local storage

💡 🚧 Hit a cap on yelp API requests that can be made in a day trying to debug the favorites list with useEffects / looping in React

📐  Updated Render to someone else's API key so our page would work again


</details>


### [W17D4](#W17D4) | 2022.12.08  
<details><summary>Details</summary>

🖥 
- [Team] Worked on Deployement
- Bug fixes that were found deployment
- Code update for linter/bugs to merge in unit test on !38

🙌🏻 Deployed with minimal issues
👾 Something broke the favorites list - no longer displaying/storing fetched names correctly

📐  

💡 Check formatter - had to go and run formatter on a ton of files for pipeline linter. Also black allows longer characters/line than flake8, so had to manually update a few.

</details>


### [W173](#W17D3) | 2022.12.07  
<details><summary>Details</summary>

🖥 
- [Team] Working session preppping doc updates for deployment
- Completed favorites list and merged on !25
- Added auth requirements for favorites service endpoints

📐  

💡 

</details>


### [W17D2](#W17D2) | 2022.12.06  
<details><summary>Details</summary>

🖥 
- [Team] Debugging
- Created favorites list
- Worked on unit test for Yelp API service (search results endpoint)
- Added auth requirements for favorites service

📐  Updated yelp API service return for search as `yelp_id` instead of `id` to align better for shared brewery list component where favorites retrun has favorites `id` and separately `yelp_id`

💡 

</details>

### [W17D1](#W17D1) | 2022.12.05
<details><summary>Details</summary>

🖥 
- [Team] Review of balance of workload
- [Team] Debugging sign up / log out functions -> resolved merge conflicts
- Started working on favorites list component
- Updated loaders and added css for brewery lists -> completed !20

📐 reviewed update from instructors on using ElephantSQL

👾💡 useToken hook code was pointing to the wrong endpoint for logout that we had to debug, & learned that when calling the methods in built into the hook, the array order translates from the return from the function definiton.

🙌🏻 finally got auth working ! We had some successes along the way on other days, but there were a lot of small inconsistencies in the cookbooks that we had to resolve.

</details>


## CW48

### [W16D7](#W16D7) | 2022.12.04
<details><summary>Details</summary>

🖥 
- Tried & failed to build unit test
- Finalized search results and built merge request !20

</details>

### [W16D5](#W16D5) | 2022.12.02
<details><summary>Details</summary>

🖥 [Team] Debugged docker container issues

📐 

💡 Docker container was pointing to the same postgres DB to build for favories & accounts services (where were supposed to be different)

</details>

### [W16D4](#W16D4) | 2022.12.01
<details><summary>Details</summary>

🖥 [Sean] Debugged details page

📐 

💡 

</details>

### [W16D3](#W16D3) | 2022.11.30
<details><summary>Details</summary>

🖥 ??? Built search results components && favorites fetch request?

📐 

💡 

</details>


### [W16D2](#W16D2) | 2022.11.29
<details><summary>Details</summary>

🖥
- Reviewed info on state management, reviewed components plan to define shared state & added to code
- Started favorites button / search list features 

📐  

💡 

</details>


### [W16D1](#W16D1) | 2022.11.28
<details><summary>Details</summary>

🖥 
- Systems design review
- Mapped out state management
- !18

📐  

💡 

</details>


## CW47

### [W15D5](#W15D5) | 2022.11.25
<details><summary>Details</summary>

🖥 
- Decoding for single brewery detail page
- Cleaned up comments & added doc strings for Yelp API service
- Created merge request for yelp API service backend

📐  

💡 

</details>

### [W15D3](#W15D3) | 2022.11.23
<details><summary>Details</summary>

🖥 
- [Team] Worked through merge requests for favorites & accounts
- [Team] Reviewed architecture & pair program as a team to build inital react router
- Updated response models for featured breweries 
- Organized / cleaned up yelp API service code

📐  Detailed disucssion related for react pages and what components are required for SPAs 

💡 


</details>

### [W15D2](#W15D2) | 2022.11.22
<details><summary>Details</summary>

🖥
- [Team] Design review & presented work on endpoints created for each microservice
- [Team] Walk through on merging completed work (started)


📐  Reviewed and discussed method for random select of featured cities & getting breweries for homepage

💡 


</details>

### [W15D1](#W15D1) | 2022.11.21
<details><summary>Details</summary>

🖥 
- [Team] Review of UI wireframes and defined React pages / components that need to be built
- [Sean, & partial Yaning] More paired programming working on Yelp API requests
    - Lots of time discussing how to manipulate the data returned to what we needed, and deciding what would be mapped out in the React components instead
    - Spent most of the time trying to debug & parse API calls 

📐 Design discussions:
    - Talked through data models & outputs format Yelp service to translate correctly to React
        - decoding Yelp API response / Pydantic's base models and how to translate for use in our API
    - Parsing response from Yelp API to reduce content to values we needed & discussed different options
- Worked on some psuedocode to confirm data output and potential logic for mapping & managing data with UI / in React

💡 DETAILS! Spent too much time debugging blockers that ended up being incorrect interpretation / translation of the Yelp API return that caused errors for our response models
</details>


## CW46

### [W14D5](#W14D5) | 2022.11.18
<details><summary>Details</summary>

🖥 Project setup continued
- Updated README.md  & supporting documentation / diagrams
- [Sean] Pair programming working on Yelp API GET request for breweries list
- Debugged ref Yelp API key from .env file

📐 Talked through design considerations for Yelp microservice and code structure for Pydantic models, FastAPI app, and request function for Yelp API call.

💡 Items in git ignore like keys stored in .env need to be passed into the docker container, or otherwise aren't recognized.

</details>


### [W14D4](#W14D4) | 2022.11.17
<details><summary>Details</summary>

🖥 Project setup continued
- Merged !1 request after approval
- [Team] Set up journal branch & files
- [Team] Set up FastAPI app for favorites & Yelp API microservices
- [Sean] Walked through !3 request and troubleshoot with ammending the commit message
- Started pulling wireframe images to update README for MVP deliverable due 11/18

📐 Set up of FastAPI app for Yelp API as a separate microservice to manage the calls there instead of directly as fetch requests in React app

💡 GitLab's merge commits automatically include "Merge branch '<branch name> into 'main', which is harder to ammend with protected branches. So the checkbox option to edit commit before merging should be used in cases like today's when you do work on a branch that's name isn't as descriptive of the merge. Or rename the branch before creating the merge request.

✅ Descisons
- Creating separate DBs for user accounts vs favorites instead of having this in the same DB as separate tables (this was mostly just reiterated)
- ⬆︎ about FastAPI app for Yelp API calls
- High level getting backend work done by end of next week (Wed since it's a short week for Thanksgiving), CW48 to work on React app / frontend & unit tests, then CW49 for any rolled over issues we run into & deployment
</details>


### [W14D3](#W14D3) | 2022.11.16
<details><summary>Details</summary>

🖥 Updated API docs & project set up
- [Team] Updated api-design doc endpoints for Yelp API  
- [Team] 💫 Tested some Yelp API calls as a group
- [Team] Set up fast API app for user accounts microservice
- Created a merge request for changes pushed

📐 A lot of design discussions surrounding what data we could pull from the Yelp API and what to include in details with the data returned

💡 Significance of - (hyphens) in yaml files. We ran into issues and had to troubleshoot for a while with rebuilding the docker image using docker-compose since I had included - that weren't supposed to be there when defining the new service

</details>


### [W14D2](#W14D2) | 2022.11.15
<details>  

🖥 [Team] Project planning
- Reviewed and aligned on database structures
- Mapped out high level WBS
- GitLabs set up
    - Set up project milestones
    - Created project labels
    - Added open questions to issues list
    - Configured project labels & issues board
    - Created issues for backend development issues and placeholders for TBD items  

📐 Design discussions for API endpoint changes with shift to Yelp API vs previous Open Brewery DB + Google Places

💡 Figured out how to create diagrams in Markdown with PlantUML to post to Wiki > Planning pages
</details>


---

---

<details>
<summary>Journal Template</summary>
Ref [W14 → 🛠️ D1: Project Advice → Journaling](https://learn-2.galvanize.com/cohorts/3417/blocks/1893/content_files/build/01-crud/68-module-project.md)

### [W1_D_](#W1_D_) | 2022.11.__  
<details><summary>Details</summary>

🖥 

📐  

💡 

</details>

***Required***:
🖥 A list of features/issues that you worked on and who you worked with, if applicable  

📐 A reflection on any design conversations that you had  

💡 At least one ah-ha! moment that you had during your coding, however small 

***Other***:
- 👾 Problems / bugs
- 🚧 Bottlenecks encountered
- 💫 Solutions explored
- ✅ Track decisions
- 🙌🏻 Log your successes
- [ ] Things to revisit later / to dos
- 💫 Ambitions and goals
- 🪞 Reflection / lessons learned


</details>
