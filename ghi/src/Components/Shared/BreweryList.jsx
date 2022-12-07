import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton'
import './List.scss';

const BreweriesList = ({
    breweries, setBreweryYelpID,
    loginStatus, userFavorites,
}) => {

    return (
        <div className="List">
                <ul className="List-table">
                    {breweries.map((brewery) => (
                        <li key={brewery.yelp_id} className="List-item">
                            <Link
                                onClick={() => { setBreweryYelpID(brewery.yelp_id); }}
                                to={{ pathname: '/brewery/' }}>
                                {brewery.name} 
                            </Link>
                            { loginStatus
                                ?   <FavoriteButton
                                        breweryYelpID={brewery.yelp_id}
                                        userFavorites={userFavorites}
                                    />
                                : <br></br>
                            }
                        </li>
                    ))}
                </ul>
        </div>
    )
}

export default BreweriesList