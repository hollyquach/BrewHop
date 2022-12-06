import { useEffect } from "react";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Loader from 'react-loaders';

export default function Detail({ yelpID }) {
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
                <div className='brewery-details'>
                    <div className='text-area'>
                        <h1 className='title'>
                            {brewery.name}
                        </h1>
                            <img
                                src={brewery.image_url}
                                alt='brewery'
                            />
                        <h3>Address</h3>
                        <p>{brewery.address.join(" ")}</p>
                        <h3>Contact Info</h3>
                        <p>{brewery.display_phone}</p>
                        <h3>Hours</h3>
                        <ul>
                            {brewery.open.map(i => {
                                return (
                                    <li key={i}>{i}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="map-container">
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
                    </div>
                </div>
                :
                <Loader type="line-scale-pulse-out" />
            }
        </>
    )
}