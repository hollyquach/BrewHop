import './index.scss'
import Empty from "./Empty"
import Detail from "./Detail"


export default function Brewery({yelpID}) {

    return (
        <div>
            { yelpID
                ?<Detail yelpID={yelpID} />
                :<Empty />
            }
        </div>
    )
}