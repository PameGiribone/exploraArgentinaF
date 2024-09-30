import React, { useEffect, useState } from 'react'
import { useTourState } from '../Context/GlobalContext';
import Button from '../Components/Button';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

export const ReservationConfirmed = () => {
  const { state, dispatch } = useTourState();
  const { userId } = useTourState();
  const [reservationConfirm,setReservationConfirm] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const urlReservation = `https://accurate-spontaneity-production.up.railway.app/reservar/${params.id}`;
  console.log(urlReservation);
  console.log(reservationConfirm);
  
  // Verificar si el usuario ha cerrado sesión y redirigir al Home
  useEffect(() => {
    const userActive = localStorage.getItem("userActive"); // Obtener de localStorage
    if (!userActive) {
      navigate('/'); // Redirigir al Home si el usuario cierra sesión
    }
  }, [state.userActive, navigate]);

  useEffect(()=>{
    axios(urlReservation).then((res) => setReservationConfirm(res.data));
  },[params.id])
  
  useEffect(()=>{
    const userId = localStorage.getItem("userId")
     const userName = localStorage.getItem("userName");
     const userSurname = localStorage.getItem("userSurname");
     const userEmail = localStorage.getItem("userEmail");

     dispatch({ type: "SET_USER_NAME", payload: userName });
     dispatch({ type: "SET_USER_SURNAME", payload: userSurname });
     dispatch({ type: "SET_USER_EMAIL", payload: userEmail });
     dispatch({ type: "SET_USER_ID",payload:userId})
 },[dispatch])

 
 return (
    <div className="container-reservation">
        <div className="card-booking-reservation-confirm">         
          <h3>YA TENES RESERVADO TU TOUR !!!</h3>
          <p>Estas listo/a ?</p>
          <div className="info-card-booking-confirm">
            <p>DATOS DE LA RESERVA</p>
            <p>N° de Reserva: <span>{state.reservationId}</span> </p>
            <p>Nombre: <span>{state.userName} {state.userSurname}</span></p>
            <p>Email: <span>{state.userEmail}</span></p>
            {/* Formatear la fecha en DD/MM/YYYY para mostrarla */}
            <p>Fecha: <span>{new Date(state.dataReserved).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}</span></p>
            <p>Personas: <span>{state.people}</span></p>
            <p className='price-reserved'>Total: USD {state.priceReserved}</p>
          </div>
          <p>Por favor, presenta este comprobante al momento de realizar el tour. Es fundamental para garantizar el acceso a la actividad.</p>
        </div>

        <div className='container-btn-r-confirm'>
          <Link to={`/historial`} state={{ fromReservationConfirmed: true }}>
            <Button className="btn-reserv-confirm">Ir a mis Reservas</Button>
          </Link>
          
        </div>

        
    </div>
  );
};

export default ReservationConfirmed;