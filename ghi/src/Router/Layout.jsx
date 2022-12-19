import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Layout/Nav';
import FooterBar from '../Layout/Footer';
import Login from '../Components/Login';
import AccountForm from '../Components/AccountForm';
import Booting from '../Components/BackendBoot';


export default function Layout({
    searchCity,
    setSearchCity,
    searchState,
    setSearchState,
    loginStatus,
    setLoginStatus,
    setShowLoginForm,
    setShowSignupForm,
    showLoginForm,
    showSignupForm,
    userName,
    setUserName,
    userID,
    setUserID,
    bootStatus,
    favoritesBootError,
    accountsBootError,
    externalAPIBootError
}) {
    return (
        <>
            {bootStatus === 100 ?
                <div className="App">
                    <div>
                        <Navigation
                            searchCity={searchCity}
                            setSearchCity={setSearchCity}
                            searchState={searchState}
                            setSearchState={setSearchState}
                            loginStatus={loginStatus}
                            setLoginStatus={setLoginStatus}
                            userName={userName}
                            setShowLoginForm={setShowLoginForm}
                            setShowSignupForm={setShowSignupForm}
                        />
                    </div>
                    <div>
                        <Outlet />
                    </div>
                    <div>
                        <Login
                            setShowLoginForm={setShowLoginForm}
                            showLoginForm={showLoginForm}
                            setLoginStatus={setLoginStatus}
                            setUserID={setUserID}
                            setUserName={setUserName}
                        />
                    </div>
                    <div>
                        <AccountForm
                            setShowSignupForm={setShowSignupForm}
                            showSignupForm={showSignupForm}
                            setLoginStatus={setLoginStatus}
                            setUserID={setUserID}
                            setUserName={setUserName}
                        />
                    </div>
                    <div>
                        <FooterBar />
                    </div>
                </div>
                :
                <div className='App-Header'>
                    <div>
                        <Booting
                            bootStatus={bootStatus}
                            favoritesBootError={favoritesBootError}
                            accountsBootError={accountsBootError}
                            externalAPIBootError={externalAPIBootError}
                        />
                    </div>
                </div>
            }
        </>
    )
}
