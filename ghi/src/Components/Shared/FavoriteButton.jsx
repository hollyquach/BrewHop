import Button from 'react-bootstrap/Button';
import { useAuthContext } from '../useToken'

const FavoriteButton = ({ breweryYelpID, userFavorites, userID }) => {
    const { token } = useAuthContext();


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
            let data = await response.json();
            setUserFavorites((list) => [...list, data])
        } else {
            console.error(`🛑🛑 ERROR creating favorite |`, response);
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
            setUserFavorites((current) => current.filter((brewery)=> brewery.yelp_id !== breweryYelpID ))
        } else {
            console.error(`🛑🛑 ERROR deleting favorite |`, response)
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
        </>
    )
}

export default FavoriteButton
