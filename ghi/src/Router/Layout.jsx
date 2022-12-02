import { Outlet } from 'react-router-dom'
import Navigation from '../Layout/Nav'
import FooterBar from '../Layout/Footer'


export default function Layout({ searchCity, setSearchCity, searchState, setSearchState, loginStatus, userName }) {
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
                    />
                </div>
                <div>
                    <Outlet />
                </div>
                <div>
                    <FooterBar />
                </div>
            </div>
        </>
    )
}
