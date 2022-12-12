import Button from 'react-bootstrap/Button';
import { useAuthContext } from "../../Hooks/useToken";
import { useState } from "react";
import { useFavoritesContext, getBreweryName } from '../../Hooks/useFavorites';
import Spinner from 'react-bootstrap/Spinner';

const FavoriteButton = ({
    breweryYelpID,
    userID
}) => {
    const { token } = useAuthContext();
    const { userFavorites, setUserFavorites } = useFavoritesContext();
    const [showSpinner, setSpinner] = useState(false);

    const newUserFavorite = async (id) => {
        setSpinner(true)
        let url = `${process.env.REACT_APP_FAVORITES_SERVICE_API_HOST}/favorites/`
        let config = {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                "user_id": userID,
                "yelp_id": id,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await fetch(url, config);
        if (response.ok) {
            let brewery = await response.json();
            brewery["name"] = await getBreweryName(brewery.yelp_id)
            setUserFavorites((list) => [...list, brewery])
        } else {
            console.error(`🛑🛑 ERROR creating favorite |`, response);
        }
        setSpinner(false)
    }


    const deleteFavorite = async (id) => {
        setSpinner(true)
        let url = `${process.env.REACT_APP_FAVORITES_SERVICE_API_HOST}/favorites/${id}`
        let config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        let response = await fetch(url, config)
        if (response.ok) {
            window.setTimeout(() => {
                setUserFavorites((current) => current.filter((brewery) => brewery.yelp_id !== breweryYelpID))
                setSpinner(false)
            }, 250);
        } else {
            console.error("error")
        }
    }


    const find = (element) => element.yelp_id === breweryYelpID
    const idx = userFavorites.findIndex(find)

    return (
        <>
            {userFavorites.some(obj => {
                return obj.yelp_id === breweryYelpID
            })
                ? <Button
                    className="float-right btn  btn-sm"
                    style={{ marginLeft: 10 }}
                    onClick={() => deleteFavorite(userFavorites[idx].id)}
                    variant="warning"
                > ⭐️ </Button>
                : <Button
                    className="float-right btn  btn-sm"
                    onClick={() => newUserFavorite(breweryYelpID)}
                    style={{ marginLeft: 10 }}
                    variant="outline-secondary"
                > ★ </Button>
            }
            <Spinner
                className={showSpinner === true ? "float-right mx-2" : "d-none"}
                animation="border"
                variant="secondary"
            />
        </>
    )
}

export default FavoriteButton
