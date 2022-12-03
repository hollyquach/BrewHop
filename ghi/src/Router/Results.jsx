import React from "react"

export default function Results({searchCity, searchState}) {

    return (
        <div className="App">
            <header className="App-header">
                <p>You have searched {searchCity}, {searchState}</p>
            </header>
        </div>
    )
}
