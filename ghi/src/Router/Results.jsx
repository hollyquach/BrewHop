import React, { useState, useEffect, useMemo } from 'react'
import Alert from 'react-bootstrap/Alert';
import BreweryList from '../Components/Shared/BreweryList'
import Pages from '../Components/Shared/Pagination'
import '../Components/Shared/List.scss';
import Loader from 'react-loaders';

export default function Results({
    searchCity, searchState,
    loginStatus,
    userFavorites, setUserFavorites,
    breweryYelpID, setBreweryYelpID
}) {
    const [breweries, setBreweries] = useState([]) // store brewery data from search
    const [currentPage, setCurrentPage] = useState(1) // set page number -> for pagination and brewery index
    const [isLoading, setIsLoading] = useState(true)
    const pageSize = 5 


    const getData = async () => {
        let url = `${process.env.REACT_APP_YELP_API_SERVICE_API_HOST}/api/breweries?city=${searchCity}&state=${searchState}`

        const response = await fetch(url);
        console.info("🚦🍺🍺 QUERYING YELP SERVICE |", response.url)

        if (response.ok) {
            let data = await response.json();
            setBreweries(data.businesses);
            setCurrentPage(1);
            setIsLoading(false);
        } else {
            console.error(`🛑🛑 ERROR searching for breweries |`, response)
        }
    }

    //> Filters list of breweries by page number
    const currentBreweries = useMemo(() => {
        const firstIdx = (currentPage - 1) * pageSize;
        const lastIdx = firstIdx + pageSize;
        
        return breweries.slice(firstIdx, lastIdx);
    }, [currentPage, breweries]);
    

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }


    useEffect(() => {
        setIsLoading(true)
        getData()
    }, [searchCity, searchState]);

    
    return (
        <>
        <div className="List">
            {
                searchCity.length === 0 || searchState.length === 0
                    ? <>
                        <div className="App-header">
                        <h1>
                            Missing search input - <span>please enter a city/state!</span>
                        </h1>
                        </div>
                    </>
                    : isLoading
                        ? <>
                            <div className="App">
                                <header className="App-header">
                                    <div>
                                        <Loader type="line-scale-pulse-out" />
                                    </div>
                                </header>
                            </div>
                        </>
                        : breweries.length > 0
                            ?   <>
                                    <div className="App">
                                        <div className="List-header">
                                            <div className="col-md-12">
                                                <br />
                                                <h1>Search results for <span>{searchCity}, {searchState}</span></h1>
                                            </div>
                                        </div>
                                        <BreweryList
                                            breweries={currentBreweries}
                                            loginStatus={loginStatus}
                                            userFavorites={userFavorites}
                                            breweryYelpID={breweryYelpID}
                                            setBreweryYelpID={setBreweryYelpID}
                                        />
                                        <Pages
                                            itemsCount={breweries.length}
                                            pageSize={pageSize}
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </>
                            : <>
                                <div className="App-header">
                                    <h1>
                                        <span> Sorry, we couldn't find any breweries!</span>
                                        Please try a different search.
                                    </h1>
                                </div>
                            </>
            }
        </div>
        </>
    )
}
