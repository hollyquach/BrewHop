import Button from 'react-bootstrap/Button';
import { useToken } from '../useToken'

const FavoriteButton = ({ breweryYelpID, userFavorites, userID }) => {
    const [token] = useToken();


    const newUserFavorite = async (id) => {
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
            await response.json();
        } else {
            console.error(`🛑🛑 ERROR posting to user favorites |`, response);
        }
    }


    const deleteFavorite = async (id) => {
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
            return alert("Success! Removed from favorites.")
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
                > ⭐️⭐️ </Button>
                : <Button
                    className="float-right btn  btn-sm"
                    onClick={() => newUserFavorite(breweryYelpID)}
                    style={{ marginLeft: 10 }}
                    variant="outline-secondary"
                > ★★ </Button>
            }
        </>
    )
}

export default FavoriteButton
