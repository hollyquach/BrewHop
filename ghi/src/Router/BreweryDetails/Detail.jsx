import { useEffect } from "react";
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Loader from 'react-loaders';
import FavoriteButton from '../../Components/Shared/FavoriteButton'

export default function Detail({
    yelpID,
    loginStatus,
    userFavorites,
    userID }) {
    const [brewery, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        async function getBreweryDetails() {
            const url = `${process.env.REACT_APP_YELP_API_SERVICE_API_HOST}/api/brewery?yelp_id=${yelpID}`
            const fetchConfig = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setData(data)
                setLoaded(true)
            }

        };
        getBreweryDetails()
    }, [yelpID]);

    return (
        <>
            {isLoaded ?
                <div className="brewery-details">
                    <Row className='justify-content-md-center'>
                        <Col>
                            <Card style={{ width: '100%' }} className='text-area'>
                                <Card.Title className='title'>{brewery.name}</Card.Title>
                                <Card.Img
                                    src={brewery.image_url}
                                    alt='brewery' />
                                {loginStatus
                                    ?
                                    <>
                                        <div className="favorite-btn">
                                            <FavoriteButton
                                                breweryYelpID={yelpID}
                                                userFavorites={userFavorites}
                                                userID={userID}
                                            />
                                        </div>
                                        <span className="fav-text">Add to favorites?</span>
                                    </>
                                    :
                                    <p></p>
                                }
                                <Card.Body>
                                    <Card.Text as="h5">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>Address <br />
                                                {brewery.address.join(" ")} <br />
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Text>
                                    <Card.Text as="h5">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                Contact Information <br />
                                                {brewery.display_phone}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Text>
                                    <Card.Text as="h5">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                Brewery hours <br />
                                                {brewery.open.map(i => {
                                                    return (
                                                        <li key={i}>{i}</li>
                                                    )
                                                })}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="map-container">
                                <MapContainer center={[brewery.latitude, brewery.longitude]}
                                    zoom={20}
                                    scrollWheelZoom={true}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[brewery.latitude, brewery.longitude]}>
                                        <Popup>
                                            <p>{brewery.name}
                                                <br />
                                                <span>{brewery.address.join(" ")}</span>
                                            </p>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Card>
                        </Col>
                    </Row>
                </div>
                :
                <Loader type="line-scale-pulse-out" />
            }
        </>
    )
}
