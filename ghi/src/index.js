import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD
import { AuthProvider } from './Components/useToken.js'
=======
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
>>>>>>> main

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <AuthProvider>
      <App />
    </AuthProvider>
=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
>>>>>>> main
  </React.StrictMode>
);
