import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, getToken } from "./Hooks/useToken";
import { FavoritesProvider } from './Hooks/useFavorites';

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, '');

function GetToken() {
    getToken();
    return null
}

root.render(
    <React.StrictMode>
        <AuthProvider>
            <FavoritesProvider>
                <BrowserRouter basename={basename}>
                    <GetToken />
                    <App />
                </BrowserRouter>
            </FavoritesProvider>
        </AuthProvider>
    </React.StrictMode>
);
