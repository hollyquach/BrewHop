import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts'
import { Route, Routes } from 'react-router-dom'
import './App.scss';
import Featured from './Router/Featured/Featured.jsx'
import Layout from './Router/Layout'
import Results from './Router/Results';
import Favorites from './Router/Favorites.jsx';
import Brewery from './Router/BreweryDetails/Brewery'
import Invalid from './Router/Invalid.jsx';
import { useToken } from './Components/useToken.js'

export default function App() {
  const [searchCity, setSearchCity] = useState('') // search param - user input in search form -> results
  const [searchState, setSearchState] = useState('') // search param - user input in search form -> results
  const [loginStatus, setLoginStatus] = useState(false)
  const [userID, setUserID] = useLocalStorage("userID", null) // int of userID
  const [userName, setUserName] = useLocalStorage("userName", '')
  const [userFavorites, setUserFavorites] = useState([]) // list of yelp_ids -> user's favorited breweries
  const [breweryYelpID, setBreweryYelpID] = useState('') // string of a single yelp ID
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [token] = useToken();

  useEffect(() => {
    setLoginStatus(token ? true : false);
    setUserID(token ? userID : null);
    setUserName(token ? userName : '')
  }, [token, userID, userName, setUserID, setUserName]);


  // [] function to update favorites (add or delete)

  const getUserFavorites = async () => {
    // only runs if user is logged in
    if (loginStatus) {
      let url = `${process.env.REACT_APP_FAVORITES_SERVICE_API_HOST}/favorites/${userID}`
      let config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      console.info(`🚦⭐️⭐️ QUERYING FAVORITES SERVICE | ${url}`)

      const response = await fetch(url, config);
      if (response.ok) {
        let data = await response.json();
        setUserFavorites(data)
      } else {
        console.error(`🛑🛑 ERROR getting user favorites |`, response);
      }
    } else {
      console.debug(`🚦🚦 getUserFavorites | NOT LOGGED IN`);
    }
  }

  useEffect(() => {
    getUserFavorites();
  }, [userID]);


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

  // [] pass props into components as required
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
              breweryYelpID={breweryYelpID} setBreweryYelpID={setBreweryYelpID} />
          } />
          <Route path="favorites/" element={<Favorites />} />
          <Route path="brewery/" element={<Brewery yelpID={breweryYelpID} />} />
          <Route path="*" element={<Invalid />} />
        </Route>
      </Routes>
    </div>
  );
}
