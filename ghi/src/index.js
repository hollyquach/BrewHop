import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider, useToken } from "./Components/useToken";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, '');

function GetToken() {
    // Get token from JWT cookie (if already logged in)
    useToken();
    return null
}

root.render(
    <AuthProvider>
        <BrowserRouter basename={basename}>
            <GetToken />
            <App />
        </BrowserRouter>
    </AuthProvider>
);
