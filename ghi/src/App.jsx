import React, { useState, useEffect } from 'react';
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Featured from './Router/Featured/Featured.jsx';
import Layout from './Router/Layout';
import Results from './Router/Results';
import Favorites from './Router/Favorites.jsx';
import Brewery from './Router/BreweryDetails/Brewery';
import Invalid from './Router/Invalid.jsx';
import { useAuthContext } from './Hooks/useToken.js';
import { useFavoritesContext } from './Hooks/useFavorites';

export default function App() {
    const [searchCity, setSearchCity] = useSessionStorage("searchCity", '')
    const [searchState, setSearchState] = useSessionStorage("searchState", '')
    const [loginStatus, setLoginStatus] = useLocalStorage("loginStatus", false)
    const [userID, setUserID] = useLocalStorage("userID", null)
    const [userName, setUserName] = useLocalStorage("userName", '')
    const [breweryYelpID, setBreweryYelpID] = useSessionStorage("breweryYelpID", '')
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showSignupForm, setShowSignupForm] = useState(false)
    const [bootStatus, setBootStatus] = useState(100)
    const { token } = useAuthContext();
    const { setUserFavorites } = useFavoritesContext();

    useEffect(() => {
        if (token === false) {
            setUserID(null);
            setUserName('');
            setUserFavorites([]);
            localStorage.clear();
        }
    }, [token, setUserID, setUserName, setLoginStatus, setUserFavorites]);


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
                    bootStatus={bootStatus}
                    setBootStatus={setBootStatus}
                />} >
                    <Route index element={<Featured setID={setBreweryYelpID} />} />
                    <Route path="search/" element={
                        <Results
                            searchCity={searchCity} searchState={searchState}
                            loginStatus={loginStatus}
                            breweryYelpID={breweryYelpID} setBreweryYelpID={setBreweryYelpID}
                            userID={userID}
                        />
                    } />
                    <Route path="favorites/" element={
                        <Favorites
                            loginStatus={loginStatus}
                            breweryYelpID={breweryYelpID} setBreweryYelpID={setBreweryYelpID}
                        />
                    } />
                    <Route path="brewery/" element={
                        <Brewery
                            yelpID={breweryYelpID}
                            loginStatus={loginStatus}
                            userID={userID} />} />
                    <Route path="*" element={<Invalid />} />
                </Route>
            </Routes>
        </div>
    );
}
