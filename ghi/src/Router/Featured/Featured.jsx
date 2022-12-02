import { useEffect } from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate } from 'react-router-dom';
import './index.scss'

export default function Featured({ setBreweryYelpID }) {
    const [featured, setData] = useState([])
    const [isLoaded, setLoaded] = useState(false)


    useEffect(() => {
        async function getFeatured() {
            const url = `http://localhost:8002/api/featured`
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
        getFeatured()
    }, []);

    const navigate = useNavigate()

    const setID = (breweryYelpID) => {
        setBreweryYelpID(breweryYelpID)
        navigate('/brewery')
    }

    return (
        <>
            {isLoaded ?
                <div className="App">
                    <body className="App-header">
                        <div className="featured">
                            <div className="card1">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img className="img" variant="top" src={featured.breweries[0].image_url} />
                                    <Card.ImgOverlay>
                                        <Card.Body>
                                            <Card.Title className="text-light">{featured.breweries[0].name}</Card.Title>
                                            <Button variant="primary" onClick={() => setID(featured.breweries[0].id)}>View details</Button>
                                        </Card.Body>
                                    </Card.ImgOverlay>
                                </Card>
                            </div>
                            <div className="card2">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img className="img" variant="top" src={featured.breweries[1].image_url} />
                                    <Card.ImgOverlay>
                                        <Card.Body>
                                            <Card.Title className="text-light">{featured.breweries[1].name}</Card.Title>
                                            <Button variant="primary" onClick={() => setID(featured.breweries[1].id)}>View details</Button>
                                        </Card.Body>
                                    </Card.ImgOverlay>
                                </Card>
                            </div>
                            <div className="card3">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img className="img" variant="top" src={featured.breweries[2].image_url} />
                                    <Card.ImgOverlay>
                                        <Card.Body>
                                            <Card.Title className="text-light">{featured.breweries[2].name}</Card.Title>
                                            <Button variant="primary" onClick={() => setID(featured.breweries[2].id)}>View details</Button>
                                        </Card.Body>
                                    </Card.ImgOverlay>
                                </Card>
                            </div>
                        </div>
                    </body>
                </div>
                :
                <div className="App">
                    <header className="App-header">
                        <div>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Placeholder as={Card.Title} animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder as={Card.Text} animation="glow">
                                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                        <Placeholder xs={6} /> <Placeholder xs={8} />
                                    </Placeholder>
                                    <Placeholder.Button variant="primary" xs={6} />
                                </Card.Body>
                            </Card>
                        </div>
                    </header>
                </div>}
        </>
    )
}