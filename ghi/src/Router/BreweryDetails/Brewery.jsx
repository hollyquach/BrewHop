import './index.scss'
import Empty from "./Empty"
import Detail from "./Detail"


export default function Brewery({ 
    yelpID,
    loginStatus,
    userFavorites,
    userID }) {

    return (
        <div>
            { yelpID
                ? <Detail 
                yelpID={yelpID}
                loginStatus={loginStatus}
                userFavorites={userFavorites}
                userID={userID} />
                :<Empty />
            }
        </div>
    )
}