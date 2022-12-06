import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.scss';
import Featured from './Router/Featured/Featured.jsx'
import Layout from './Router/Layout'
import Results from './Router/Results';
import Favorites from './Router/Favorites.jsx';
import Brewery from './Router/BreweryDetails/Brewery'
import Invalid from './Router/Invalid.jsx';

export default function App() {
  const [searchCity, setSearchCity] = useState('') // search param - user input in search form -> results
  const [searchState, setSearchState] = useState('') // search param - user input in search form -> results
  const [loginStatus, setLoginStatus] = useState(false)
  const [userID, setUserID] = useState('') // int of userID
  const [userName, setUserName] = useState('')
  const [userFavorites, setUserFavorites] = useState([]) // list of yelp_ids -> user's favorited breweries
  const [breweryYelpID, setBreweryYelpID] = useState('') // string of a single yelp ID
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [token] = useToken();

  useEffect(() => { setLoginStatus(token ? true : false) }, [token]);

  //?? add state for userJWT token


  // [] function to get favorites by user | input user ID, returns list of favorites -> setUserFavorites
  // [] function to update favorites (add or delete)

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
          userName={userName}
          showSignupForm={showSignupForm}
          setShowSignupForm={setShowSignupForm}
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
        />} >
          <Route index element={<Featured setID={setBreweryYelpID} />} />
          <Route path="search/" element={<Results
            searchCity={searchCity}
            searchState={searchState}
          />} />
          <Route path="favorites/" element={<Favorites />} />
          <Route path="brewery/" element={<Brewery yelpID={breweryYelpID} />} />
          <Route path="*" element={<Invalid />} />
        </Route>
      </Routes>
    </div>
  );
}
