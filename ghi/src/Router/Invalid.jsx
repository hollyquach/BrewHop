import React from "react";
import { useNavigate } from 'react-router';

export default function Invalid() {
    const navigate = useNavigate()

    return (
        <div className="App">
            <header className="App-header">
                <img
                    alt="A Greyhound named Rocky"
                    src={`${process.env.PUBLIC_URL}/rocky.png`}
                    height="400"
                />
                <p>Move along - nothing to see here except Rocky!</p>
                <button className="btn btn-secondary" onClick={() => navigate("/")}>Home</button>
            </header>
        </div>
    )
}
