import Button  from 'react-bootstrap/Button';

const FavoriteButton = ({breweryYelpID, userFavorites}) => {

    return(
        <>
            { userFavorites.some(obj => {
                return obj.yelp_id === breweryYelpID
            })
            ? <Button
                className="float-right btn  btn-sm"
                style={{ marginLeft: 10 }}
                variant="warning"
              > ⭐️⭐️ </Button>
            : <Button
                className="float-right btn  btn-sm"
                style={{ marginLeft: 10 }}
                variant="outline-secondary"
              > ★★ </Button>
            }
        </>
    )
}

export default FavoriteButton