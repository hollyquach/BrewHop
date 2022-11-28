import { Outlet } from 'react-router-dom'
import Navigation from '../Layout/Nav'

export default function Layout() {
    return (
        <>
            <div>
                <Navigation />
                <div>
                    <Outlet />
                </div>

                {/* <Footer />  */}

            </div>
        </>
    )
}
