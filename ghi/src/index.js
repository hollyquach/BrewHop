import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { AuthProvider } from './Components/useToken.js'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useToken } from "./Components/useToken";

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, '');

function GetToken() {
    // Get token from JWT cookie (if already logged in)
    console.debug(`🚦🚦 || GetToken called in index.jsx`);
    useToken();
    return null
}


root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter basename={basename}>
                <GetToken />
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
