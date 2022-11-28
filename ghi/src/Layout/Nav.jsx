import React from 'react'

export default function Navigation() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">Featured</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="/search/">Search <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/favorites/">favorites</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/brewery/">brewery</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="*">Error Landing Page</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}