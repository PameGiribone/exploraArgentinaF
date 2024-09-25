import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*
show: Determina si el popover debe mostrarse o no.
onClose: Se ejecuta cuando se hace clic fuera del popover, cerrándolo.
onLogout: Se ejecuta cuando el usuario hace clic en Cerrar Sesión
*/

const Popover = ({ show, onClose, onLogout, name, surname, email, isAdmin }) => {
  const [adminToolsOpen, setAdminToolsOpen] = useState(false);
  const navigate = useNavigate();

  if (!show) return null;

  const handleAdminToolsClick = () => {
    // Alterna la visibilidad del menú de herramientas de administrador
    setAdminToolsOpen(!adminToolsOpen);
  };

  const handleNavigation = (path) => {
    setAdminToolsOpen(false); // Cierra el menú de herramientas de administrador
    onClose(); // Cierra el popover después de la navegación
    navigate(path);
  };

  return (
    <div className="popover">
      <div className="popover-content">
        <p>{name} {surname}</p>
        <p>{email}</p>
        <hr className="hr-custom"/>
        
        <button onClick={() => handleNavigation('/favorites')}>Mis favoritos</button>
        <button onClick={() => handleNavigation('/historial')}>Mi historial de Reservas</button>
        <hr className="hr-custom"/>
        
        {isAdmin && (     
          <div className="admin-tools"> {/* Se actualizo componente Popover para que, al hacer clic en el botón
            "Herramientas de Administrador", se despliegue un menú con varias opciones. */}
            <button className="btn-admin" onClick={handleAdminToolsClick}>
              Herramientas de Administrador
            </button>
            {adminToolsOpen && (
              <div className="admin-menu">
                <button onClick={() => handleNavigation('/userlist')}>Lista de Usuarios</button>
                <button onClick={() => handleNavigation('/productadmin')}>Gestión de Productos</button>
                {/* Agrega más opciones aquí */}
              </div>
            )}
          </div>
        )}
        <div className="visibility-popover">
            <p id="txt-popover"> Ups! Lo sentimos, las funciones del panel de control solo se encuentran
            disponibles para la versión desktop.
          </p>
        </div>
        <button onClick={onLogout}>Cerrar Sesión</button>
      </div>
      
      <div className="popover-overlay" onClick={onClose}></div>
    </div>
  );
};

export default Popover;
