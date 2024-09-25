import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTourState } from "../Context/GlobalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Popover from "./Popover";
import Avatar from "./Avatar";

const Header = () => {
  const { state, dispatch } = useTourState();
  const [showPopover, setShowPopover] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeUser = localStorage.getItem("userActive") === "true";
    const userName = localStorage.getItem("userName");
    const userSurname = localStorage.getItem("userSurname");
    const userEmail = localStorage.getItem("userEmail");
    const userAdministrator = localStorage.getItem("userAdministrator") === "true";

    if (activeUser) {
      dispatch({ type: "SET_USER_ACTIVE", payload: true });
      dispatch({ type: "SET_USER_NAME", payload: userName });
      dispatch({ type: "SET_USER_SURNAME", payload: userSurname });
      dispatch({ type: "SET_USER_EMAIL", payload: userEmail });
      dispatch({ type: "SET_USER_ADMINISTRATOR", payload: userAdministrator });
    }
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/") {
      // Si estamos en la página de inicio, asegurarnos de que el buscador esté visible
      dispatch({ type: "TOGGLE_SEARCH_FORM", payload: state.showSearchForm });
    }
  }, [location.pathname, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("userActive");
    localStorage.removeItem("userName");
    localStorage.removeItem("userSurname");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAdministrator");
    dispatch({ type: "SET_USER_ACTIVE", payload: false });
    dispatch({ type: "SET_USER_NAME", payload: "" });
    dispatch({ type: "SET_USER_SURNAME", payload: "" });
    dispatch({ type: "SET_USER_EMAIL", payload: "" });
    dispatch({ type: "SET_USER_ADMINISTRATOR", payload: false });
    setShowPopover(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    }
  };

  const handleSearchClick = () => {
    // Solo cambiar el estado si estamos en la página de inicio
    if (location.pathname === "/") {
      dispatch({ type: "TOGGLE_SEARCH_FORM", payload: !state.showSearchForm });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const scrollToFooter = () => {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSearch = () => {
    const searchElement = document.getElementById("buscador-inicio");
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBuscadorClick = () => {
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
    <div className={`container-header ${scrolled ? "scrolled" : ""}`}>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={menuOpen ? faTimes : faBars}
          className={`hamburger-icon ${scrolled ? "scrolled" : ""}`}
                  />
      </div>
      <div className="container-logo">
        <Link to="/" onClick={handleLogoClick}>
          <img className="img-logo" src="/img/logo.png" alt="logo" />
        </Link>
        <p className="logo-name">EXPLORA ARGENTINA</p>
      </div>

      <div className={`menu ${menuOpen ? 'active' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" onClick={() => { handleLogoClick(); closeMenu(); }}>
          <span className="navbar">Inicio</span>
        </Link>
        <span className="navbar" onClick={() => { handleSearchClick(); closeMenu(); handleBuscadorClick(); }}>Buscar</span>
        <span className="navbar" onClick={() => { scrollToFooter(); closeMenu(); }}>Contacto</span>
      </div>

      <div className="container-button">
        {state.userActive ? (
          <div className="user-avatar">
            <Button className={"btn-avatar"} onClick={togglePopover}>
              <Avatar />
            </Button>
            <Popover
              name={state.userName}
              surname={state.userSurname}
              email={state.userEmail}
              show={showPopover}
              onClose={togglePopover}
              onLogout={handleLogout}
              isAdmin={state.userAdministrator}
            />
          </div>
        ) : (
          <>
            <Link to="/login">
              <Button className={"btn-header"}>INICIAR SESION</Button>
            </Link>
            <Link to="/createaccount">
              <Button className={"btn-header"}>CREAR CUENTA</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
