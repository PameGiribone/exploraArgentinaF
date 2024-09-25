import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import './style/login.css';
import './style/indexCreateAccount.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import GlobalContext from "./Context/GlobalContext.jsx";
import "./icons.js";
import './style/favorites.css';
import './style/Calendar.css';
import './style/productAdmin.css';
import './style/Policies.css'
import './style/mediaquery.css'
import './style/reservation.css'
import './style/modalRegister.css'
import './style/shareModal.css'
import './style/reservationConfirm.css'
import './style/historialReservas.css'
import './style/detail.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <BrowserRouter>
      <React.StrictMode>
        <GlobalContext>
          <App />
        </GlobalContext>
      </React.StrictMode>
    </BrowserRouter>
);