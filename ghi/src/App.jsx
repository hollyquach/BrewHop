import React, { useState, useEffect } from 'react';
import { useLocalStorage, useSessionStorage } from 'usehooks-ts'
import { Route, Routes } from 'react-router-dom'
import './App.scss';
import Featured from './Router/Featured/Featured.jsx'
import Layout from './Router/Layout'
import Results from './Router/Results';
import Favorites from './Router/Favorites.jsx';
import Brewery from './Router/BreweryDetails/Brewery'
import Invalid from './Router/Invalid.jsx';
import { useAuthContext } from './Components/useToken.js'


export default function App() {
    const [searchCity, setSearchCity] = useSessionStorage("searchCity", '') // search param - user input in search form -> results
    const [searchState, setSearchState] = useSessionStorage("searchState", '') // search param - user input in search form -> results
    const [loginStatus, setLoginStatus] = useLocalStorage("loginStatus", false)
    const [userID, setUserID] = useLocalStorage("userID", null) // int of userID
    const [userName, setUserName] = useLocalStorage("userName", '')
    const [breweryYelpID, setBreweryYelpID] = useSessionStorage("breweryYelpID", '') // string of a single yelp ID
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showSignupForm, setShowSignupForm] = useState(false)
    const { token } = useAuthContext();

    const [userFavorites, setUserFavorites] = useState([]) // set page number -> for pagination and brewery index
    const [favoritesList, setFavoritesList] = useState([]) // set page number -> for 

    useEffect(() => {
        if (token === false) {
            setLoginStatus(false)
            setUserID(null);
            setUserName('');
            setUserFavorites([]);
        }
    }, [token, setUserID, setUserName, setLoginStatus, setUserFavorites]);


    const getFavorites = async () => {
        let url = `${process.env.REACT_APP_FAVORITES_SERVICE_API_HOST}/favorites/${userID}`
        let config = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch(url, config);
        let favoritesdata = []
    
        if (response.ok) {

            let favoritesdata = await response.json()

        } else {
            console.error(`🛑🛑 ERROR getting user favorites |`, response)
        }
        setUserFavorites(favoritesdata);
        getName()
        console.debug(`🖥 🖥 ||  GET USER FAVORITES STATE >>`, favoritesdata);
    }

    useEffect(() => {
        if (userID && token) {
            getFavorites()
        }
    }, [userID, token, setUserFavorites])

    const getName = () => {
        
        console.debug(`🖥 🖥 ||  GET NAME START -> FAVORITES LIST >>`, favoritesList);
        favoritesList.forEach( async(obj) => {
            let yelpurl = `${process.env.REACT_APP_YELP_API_SERVICE_API_HOST}/api/brewery?yelp_id=${obj.yelp_id}`

            // FOR EACH BREWERY, ADD NAME TO THE PROPERTY WHERE EACH ONE IS "OBJ"
            if (obj.hasOwnProperty('name') === false) {
                const response = await fetch(yelpurl);
                if (response.ok) {
                    let brewerydata = await response.json();
                    obj["name"] = brewerydata.name
                    console.debug(`🚦🚦 || userFavorites.forEach || obj`, obj);
                } else {
                    console.error(`🛑🛑 ERROR getting brewery name |`, response)
                }
            }
        })
        setUserFavorites(favoritesList)

        console.debug(`🚦🚦 || app.jsx getName after UPDATE ->`, userFavorites);
    }

    useEffect(() => {
        if (userFavorites.length > 0){
            getName()
            console.debug(`🚦🚦 || app.jsx getNAME USEEFFECT->`, userFavorites);
        }
    }, [userFavorites, setUserFavorites])



    // !! from original fork & left for ref only -> remove before deployment
    /*
      const [launch_info, setLaunchInfo] = useState([]);
      const [error, setError] = useState(null);
  
      useEffect(() => {
        async function getData() {
          let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
          console.log('fastapi url: ', url);
          let response = await fetch(url);
          console.log("------- hello? -------");
          let data = await response.json();
  
          if (response.ok) {
            console.log("got launch data!");
            setLaunchInfo(data.launch_details);
          } else {
            console.log("drat! something happened");
            setError(data.message);
          }
        }
        getData();
      }, [])
    */

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout
                    setSearchCity={setSearchCity}
                    setSearchState={setSearchState}
                    loginStatus={loginStatus}
                    setLoginStatus={setLoginStatus}
                    showSignupForm={showSignupForm}
                    setShowSignupForm={setShowSignupForm}
                    showLoginForm={showLoginForm}
                    setShowLoginForm={setShowLoginForm}
                    userName={userName}
                    setUserName={setUserName}
                    userID={userID}
                    setUserID={setUserID}
                />} >
                    <Route index element={<Featured setID={setBreweryYelpID} />} />
                    <Route path="search/" element={
                        <Results
                            searchCity={searchCity} searchState={searchState}
                            loginStatus={loginStatus}
                            userFavorites={userFavorites} setUserFavorites={setUserFavorites}
                            // userFavorites={userFavorites} setUserFavorites={setUserFavorites}
                            // userFavorites={userFavorites} setUserFavorites={setUserFavorites}
                            breweryYelpID={breweryYelpID} setBreweryYelpID={setBreweryYelpID}
                            userID={userID}
                        />
                    } />
                    <Route path="favorites/" element={
                        <Favorites
                            loginStatus={loginStatus}
                            userFavorites={userFavorites} setUserFavorites={setUserFavorites}
                            breweryYelpID={breweryYelpID} setBreweryYelpID={setBreweryYelpID}
                        />
                    } />
                    <Route path="brewery/" element={<Brewery yelpID={breweryYelpID} />} />
                    <Route path="*" element={<Invalid />} />
                </Route>
            </Routes>
        </div>
    );
}