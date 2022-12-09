import React, { useState, useMemo } from 'react'
import BreweryList from '../Components/Shared/BreweryList'
import Pages from '../Components/Shared/Pagination'
import '../Components/Shared/List.scss';
import Loader from 'react-loaders';

export default function Favorites({
    loginStatus, userID,
    userFavorites, setUserFavorites,
    setBreweryYelpID
}) {
    const [currentPage, setCurrentPage] = useState(1) // set page number -> for pagination and brewery index
    const [isLoading, setIsLoading] = useState(true)
    const pageSize = 5


    //> Filters list of breweries by page number
    const currentBreweries = useMemo(() => {
        const firstIdx = (currentPage - 1) * pageSize;
        const lastIdx = firstIdx + pageSize;

        setIsLoading(false);
        return userFavorites.slice(firstIdx, lastIdx);
    }, [currentPage, userFavorites]);


    const handlePageChange = (page) => {
        setCurrentPage(page)
    }


    return (
        <>
            <div className="List">
                {
                    loginStatus === false
                        ? <>
                            <div className="App-header">
                                <h1>
                                    Please login to view <span>favorites</span>!
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
                            : userFavorites.length > 0
                                ? <>
                                    <div className="App">
                                        <div className="List-header">
                                            <div className="col-md-12">
                                                <br />
                                                <h1><span>Favorites</span></h1>
                                            </div>
                                        </div>
                                        <BreweryList
                                            userID={userID}
                                            loginStatus={loginStatus}
                                            breweries={currentBreweries}
                                            setBreweryYelpID={setBreweryYelpID}
                                            userFavorites={userFavorites}
                                            setUserFavorites={setUserFavorites}
                                        />
                                        <Pages
                                            itemsCount={userFavorites.length}
                                            pageSize={pageSize}
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </>
                                : <>
                                    <div className="App-header">
                                        <h1>
                                            <span>
                                                You don't have any breweries saved to favorites!
                                            </span>
                                        </h1>
                                    </div>
                                </>
                }
            </div>
        </>
    )
}