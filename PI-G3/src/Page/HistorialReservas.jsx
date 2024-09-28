import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTourState } from '../Context/GlobalContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Components/Button';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const HistorialReservas = () => {
  const { state } = useTourState();
  const [reservas, setReservas] = useState([]);
  const { userId } = useTourState();
  const navigate = useNavigate();
  const location = useLocation(); // Obtiene el estado pasado en el Link

  useEffect(() => {
    const userActive = localStorage.getItem("userActive", state.userActive);
    if (!userActive ) {
      navigate('/'); // Redirigir al Home si Cierra sesión.
    }

    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId); // Verificar el userId
    if (userId) {
      axios.get(`https://accurate-spontaneity-production.up.railway.app/reservar/usuario/historial/${userId}`)
      .then(res => setReservas(res.data))
      .catch(err => console.log(err));
    }
  }, [state.userActive, userId]);

  const handleBackClick = () => {
    // Verifica si se accedió desde la página de confirmación de reserva
    if (location.state?.fromReservationConfirmed) {
      navigate('/'); // Redirige al inicio
    } else {
      navigate(-1); // Navega a la página anterior
    }
  };

  return (
    <div className="historial-reservas-container">
      <h1>Historial de Reservas</h1>
      <table className="historial-reservas-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre del Producto</th>
            <th>Imagen</th>
            <th>Ubicación</th>
            <th>Precio en USD</th>
            {/* <th>Cantidad de Personas</th>
            <th>Precio Total</th> */}
          </tr>
        </thead>
        <tbody>
          {reservas
            .sort((a, b) => new Date(b.fechaReserva) - new Date(a.fechaReserva))
            .map(reserva => {
              // Crear una nueva fecha basada en la fecha de la reserva
              const fecha = new Date(reserva.fechaReserva);
              // Sumar un día
              fecha.setDate(fecha.getDate() + 1);
  
              return (
                <tr key={reserva.id}>
                  {/* Convertir la fecha ajustada a un string */}
                  <td>{fecha.toLocaleDateString()}</td>
                  <td><Link to= {`/detail/${reserva.producto.id}`}>{reserva.producto.nombre}</Link></td>
                  <td>
                    <img 
                      src={reserva.producto.imagenUrl} 
                      alt={reserva.producto.nombre} 
                      className="product-image" 
                    />
                  </td>
                  <td>{reserva.producto.ubicacion}</td>
                  <td className="product-precio">{reserva.producto.precio}</td>
                  {/* <td>{state.people}</td>
                  <td>{(reserva.producto.precio * state.people).toFixed(2)}</td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
      
      <div className='btn-back-container'>
                <Button onClick={handleBackClick} className="btn-back-historial">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
            </div>
    </div>
  );
  
};

export default HistorialReservas;
