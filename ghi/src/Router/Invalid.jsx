import React from "react";

export default function Invalid() {

    return (
        <div className="App">
            <header className="App-header">
                <img
                    alt="A Greyhound named Rocky"
                    src={`${process.env.PUBLIC_URL}/rocky.png`}
                    height="400"
                />
                <p>Move along - nothing to see here except Rocky!</p>
            </header>
        </div>
    )
}
