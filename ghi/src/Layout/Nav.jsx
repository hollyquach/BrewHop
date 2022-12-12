import React from 'react';
import { NavLink } from 'react-router-dom';
import { useToken } from "../Hooks/useToken";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Search from '../Components/Search'


function showFavoritesButton(status) {
    if (status === true) {
        return ""
    } else {
        return "d-none"
    };
};

function showUserName(status) {
    if (status === true) {
        return ""
    } else {
        return "d-none"
    };
};

function showLoginButton(status) {
    if (status === true) {
        return "d-none"
    } else {
        return ""
    };
};

function showLogoutButton(status) {
    if (status === true) {
        return ""
    } else {
        return "d-none"
    };
};

function showSignupButton(status) {
    if (status === true) {
        return "d-none"
    } else {
        return ""
    };
};


export default function Navigation({
    searchCity,
    setSearchCity,
    searchState,
    setSearchState,
    loginStatus,
    setLoginStatus,
    userName,
    setShowLoginForm,
    setShowSignupForm
}) {
    const [, logout] = useToken();
    const handleShowLoginForm = () => setShowLoginForm(true);
    const handleShowSignupForm = () => setShowSignupForm(true);
    const handleLogout = async e => {
        e.preventDefault();
        /* handle status update before logout to prevent
        401 responses from useToken looping fetch calls */
        setLoginStatus(false);
        await logout();
    }

    return (
        <Navbar
            className="navbar-visual"
            sticky="top"
        >
            <Navbar.Collapse>
                <Navbar.Brand
                    as={NavLink}
                    to="/"
                >
                    <img
                        alt="BrewHop Logo"
                        src={`${process.env.PUBLIC_URL}/navlogo.svg`}
                        height="50"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
            </Navbar.Collapse>
            <Navbar.Collapse>
                <Search
                    searchCity={searchCity}
                    setSearchCity={setSearchCity}
                    searchState={searchState}
                    setSearchState={setSearchState}
                />
                <Nav>
                    <Nav.Link className={showFavoritesButton(loginStatus)} as={NavLink} to="favorites/">Favorites</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Navbar.Text className={showUserName(loginStatus)} >Signed in as: {userName} |</Navbar.Text>
                    <Nav.Link className={showSignupButton(loginStatus)} onClick={handleShowSignupForm}>Signup</Nav.Link>
                    <Nav.Link className={showLoginButton(loginStatus)} onClick={handleShowLoginForm}>Login</Nav.Link>
                    <Nav.Link className={showLogoutButton(loginStatus)} onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
};
