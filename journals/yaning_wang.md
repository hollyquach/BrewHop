## November 17, 2022

Today's Progess:

- Started journal entry

- Figured out merging problems to gitlab

- Completed building docker for favorite_service

- Split up into pair coding

- Started FASTapi for favorites_service

- No blockers

We as a team assigned tasks for each person and  split up into two teams to start pair coding. Holly and Sean was responsible for yelp api while Jeff and I worked on favorites and accounts api


## November 18, 2022

Today's Progress:

- Pair coding with Jeff

- Watched Curtis Videos

- No blockers

Jeff and I started working on favorites and accounts FastAPI. I was not too familiar with FastAPI but after watching the Curtis videos on Learn, I was able to start writing codes for my own Accounts API


## November 21, 2022

Today's Progress:

- Finished up Accounts API

- No blockers

Finished all of the components for Accounts API, thanks to the Curtis videos on Learn I got all the endpoints working after fixing some simple  errors

## November 22, 2022

Today's Progess

- Presenting Accounts API to the team
   - We as a team decided to update each other on the works we have be doing for the past week in order to make sure everyone is on the same page. We also helped each other troubleshoot a few errors 

- Attemped to start JWT Authentication 

- Blockers

I watched the Curtis videos on JWT Authentication and started writing codes for my own after understanding the concepts behihd JWT Authentication. Started wondering if we actually need JWT Authentication for our project

## November 23, 2022

Today's Progress

- Our plans moving forward

We as a team mostly decided on how we will be moving forward with the project, we delagated different React components so that we can work on them over the weekend and the up coming weeks

## November 28, 2022

Today's Progress

- Discussed our goals for this week

we each disucssed what we will working on and trying to accomplish this week. 

- worked on individual components

- no blockers

We each disucssed what we will working on and trying to accomplish this week. We each worked on the components we were assigned today. I am responsible for finishing the login, signup, and authorization for the front end. I manage to finish up on login page and almost finish up on signup page. I also reviewed curtis videos on useState as guidance

## November 29, 2022

Today's Progress

- Working on individual components

= no blockers

We each worked on our components. I finished up on the signup form as well as added css files to customize the forms. Today I also started on authorizatio for the front end. I read the FastAPI Authentication Cookbook on Learn but still isn't very clear on the codes. I started working but did not get very far

## November 30, 2022

Today's Progress

- Working on individual components

- Blocker: front end auth 

Still very confused about front end authorization. With the help of Yesenia I was able to created the necessary codes and files but I am currently stuck on figuring out why my login is not returning the fastapi token needed. I took a break from the program and wrote a unit test for my component, James said that there will be another lecture on this topic so I will wait until tomorrow for clarification

## December 01, 2022

Today's Progress

- Working on individal components

- no blockers

Gained some clarification with James' lecture on front end auth, changed my codes a little bit. My team decided to work on this problem as a group and with the help of Adrian, Yesenia, and Jason we were able to finally solved our blocker. To fix the problem we had to make sure that the hard coded login account actually existed in our data base, we also had to rebuild our docker image and change the environment url name. Still need to figure out how to replace the hard coded account with a code that detects any registered user. 

## December 02, 2022

Today's Progess

- worked on solving hard coded login 

- worked on merge issues

- no blockers 

We started the day with everyone working on their individual components. With the help of Adrian and Jason, I was able to solved the hard coded login problem I had yesterday. I realized my mistake was using {} instead of () when adding email and password into the const handlesubmit. After lunch we got all together to get everyone up to date with the newest main branch and solved merging issues with everyone. 

## December 05, 2022

Today's Progess

- worked on Unit test

- learned how to make a pop up log in form

- login/signup/ auth issues

- Unit Test

Over the weekend Jeff created a pop up form with the login/signup forms, I was very interested in how it was done, so Jeff and I went into a separate room and he taught me about modals that was built into react bootstrap. After we got back with our group, we troubleshooted some issues on login/signup and custom hooks in the useToken file. I also started writing unit test for accounts_service but ran into problems where pytest does not work in my terminal. 

## December 06, 2022

Today's Progess

- Finished Unit Test for accounts accounts_service

- Worked on bugs with team

I had problems with getting the unit test to pass in vsc terminal but I quickly realized that I had to install pytest in the account service docker container and run pytest there. I also had to changed my test file with that it started with the word " test ". By doing the steps above, I was able to get pytest working but still not pass. With Adrian's help, I was able to figure out some of the error I had and finally get the unit test to pass.

## December 07, 2022

Today's Progress

- Get everyone up to speed with merging branchs into main

- Getting ready for deployment

- No blockers

We did a few rounds of merge requets, solved some merge conflicts and we were able to get everyone up to date with the newest working main branch. After that we started working on CI/CD for our project. I personaly spend some time reading over the CI/CD cookbook to educate myself more on the topic. We also updated our connection pool and environmental variables 

## December 08, 2022

Today's Progress

- working on CI/CD

- Added contact form 

- No blocker

I started working on contact form but it was an stretch goal, So midway I switched back to working on CI/CD with my group in order to get project ready for deployment. I updated the our connection pool file again with the help of Daniel's code and was able to sucessfully incorporate it within our codes and got it to work. 

## December 9, 2022

Today's Progess

- Merge requests

- Debugging

- No blocker

We spend the whole day getting everyone merged in and up to date with the latest working version of our project from main. Tried to help Jeff with this unit test. Started working on debugging for some of our small errors that shows up on our webpage when it first loads. Also solved some bugs that were happening with the favorites components. 
