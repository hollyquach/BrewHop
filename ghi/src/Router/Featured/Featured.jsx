import { useEffect } from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate } from 'react-router-dom';
import './index.scss'
import Loader from 'react-loaders';

export default function Featured({ setID }) {
    const [featured, setData] = useState([])
    const [isLoaded, setLoaded] = useState(false)


    useEffect(() => {
        async function getFeatured() {
            const url = `${process.env.REACT_APP_YELP_API_SERVICE_API_HOST}/api/featured`
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
    const grabID = (id) => {
        setID(id)
        navigate('/brewery')
    }

    return (
        <>
            {isLoaded ?
                <div className="App">
                    <div className="App-header">
                        <h1 className="feature-title">
                            Check out these featured breweries in
                            <span> {featured.location}</span>,
                            <br />
                            or search in your city above.
                        </h1>
                        <div className="featured">
                            <div className="card1">
                                <Card style={{ width: '20rem', height: '30rem' }}>
                                    <Card.Img
                                        variant="top"
                                        src={featured.breweries[0].image_url} />
                                    <Card.ImgOverlay>
                                        <Card.Body>

                                            <Card.Title
                                                className="title">
                                                {featured.breweries[0].name}
                                            </Card.Title>

                                            <Button
                                                variant="primary"
                                                onClick={() => grabID(featured.breweries[0].id)}>
                                                View details
                                            </Button>

                                        </Card.Body>
                                    </Card.ImgOverlay>
                                </Card>
                            </div>
                            <div className="card2">
                                <Card style={{ width: '20rem', height: '30rem' }}>
                                    <Card.Img
                                        variant="top"
                                        src={featured.breweries[1].image_url} />
                                    <Card.ImgOverlay>
                                        <Card.Body>

                                            <Card.Title
                                                className="title">
                                                {featured.breweries[1].name}
                                            </Card.Title>

                                            <Button
                                                variant="primary"
                                                onClick={() => grabID(featured.breweries[1].id)}>
                                                View details
                                            </Button>

                                        </Card.Body>
                                    </Card.ImgOverlay>
                                </Card>
                            </div>
                            <div className="card3">
                                <Card style={{ width: '20rem', height: '30rem' }}>
                                    <Card.Img
                                        variant="top"
                                        src={featured.breweries[2].image_url} />
                                    <Card.ImgOverlay>
                                        <Card.Body>

                                            <Card.Title
                                                className="title">
                                                {featured.breweries[2].name}
                                            </Card.Title>

                                            <Button
                                                variant="primary"
                                                onClick={() => grabID(featured.breweries[2].id)}>
                                                View details
                                            </Button>

                                        </Card.Body>
                                    </Card.ImgOverlay>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="App">
                    <header className="App-header">
                        <div>
                            <Loader type="line-scale-pulse-out" />
                        </div>
                    </header>
                </div>}
        </>
    )
}