import React from 'react'

export default function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Featured</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/search/">Search <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/favorites/">favorites</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/brewery/">brewery</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="*">Error Landing Page</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}