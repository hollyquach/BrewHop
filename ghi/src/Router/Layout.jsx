import { Outlet } from 'react-router-dom'
import Navigation from '../Layout/Nav'
import FooterBar from '../Layout/Footer'
import Login from '../Components/Login'
import AccountForm from '../Components/AccountForm'


export default function Layout({
    searchCity,
    setSearchCity,
    searchState,
    setSearchState,
    loginStatus,
    setShowLoginForm,
    setShowSignupForm,
    showLoginForm,
    showSignupForm,
    userName,
    setUserName,
    userID,
    setUserID,
    setEnteredEmail
}) {
    return (
        <>
            <div>
                <div>
                    <Navigation
                        searchCity={searchCity}
                        setSearchCity={setSearchCity}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        loginStatus={loginStatus}
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
                        setUserID={setUserID}
                        setUserName={setUserName}
                    />
                </div>
                <div>
                    <AccountForm
                        setShowSignupForm={setShowSignupForm}
                        showSignupForm={showSignupForm}
                        setUserID={setUserID}
                        setUserName={setUserName}
                    />
                </div>
                <div>
                    <FooterBar />
                </div>
            </div>
        </>
    )
}
