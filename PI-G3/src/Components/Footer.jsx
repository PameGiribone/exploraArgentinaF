import React from 'react';
import '../style/footer.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useTourState } from '../Context/GlobalContext';

const Footer = () => {
  const { state, dispatch } = useTourState();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (location.pathname === "/") {
      if (!state.showSearchForm) {
        dispatch({ type: "TOGGLE_SEARCH_FORM", payload: true });
      }
      const searchElement = document.getElementById("buscador-inicio");
      if (searchElement) {
        searchElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        if (!state.showSearchForm) {
          dispatch({ type: "TOGGLE_SEARCH_FORM", payload: true });
        }
        const searchElement = document.getElementById("buscador-inicio");
        if (searchElement) {
          searchElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  return (
    <footer>
      <div className="container-footer-box">
        <div className='foot-box'>
          <div className='container-footer-logo'>
            <p>Sobre Nosotros</p>
            <img className='footer-logo' src="/img/logo.png" alt="logo" />
          </div>
          <p className='footer-about'>Explora Argentina te lleva a descubrir los mejores destinos del país con experiencias únicas.</p>
          <p className='footer-about'>Copyright © Explora Argentina 2024 All rights reserved</p>
        </div>

        <div className='foot-box'>
          <p>Acceso rápido</p>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><span className="footer-search" onClick={handleSearchClick}>Buscar</span></li>
            <li><Link to="/">Tours</Link></li>
            <li><Link to="/">Paquetes</Link></li>
          </ul>
        </div>

        <div className='foot-box'>
          <p>Destinos Populares</p>
          <ul>
            <li><Link to="/detail/1">San Carlos de Bariloche</Link></li>
            <li><Link to="/detail/4">Excursión a Cataratas de Iguazú</Link></li>
            <li><Link to="/detail/3">Bodega Trapiche</Link></li>
            <li><Link to="/detail/5">Cerro de los 7 Colores</Link></li>
            <li><Link to="/detail/16">Teleferico Cerro Otto</Link></li>
          </ul>
        </div>

        <div className='foot-box' id="footer">
          <p>Contacto</p>
          <ul>
            <div className='iconos'>
              <li>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} style={{ color: "grey" }} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} style={{ color: "grey" }} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faXTwitter} style={{ color: "grey" }} />
                </a>
              </li>
            </div>
            <li>+111 222 333</li>
            <li>info@explorarg.com</li>
            <li>1245, Bs. As. Argentina</li>
          </ul>
          <div className='clearfix'></div>
        </div>
      </div>

      <div className='new_footer_area bg_color'>
        <div className='new_footer_top'>
          <div className='footer_bg'>
            <div className='footer_bg_one'></div>
            <div className='footer_bg_two'></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
