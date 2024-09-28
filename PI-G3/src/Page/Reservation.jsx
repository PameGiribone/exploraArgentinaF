import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Components/Button';
import { useTourState } from '../Context/GlobalContext';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Reservation = () => {
    const { state, dispatch } = useTourState();
    const [reserved,setReserved] = useState([])
    const [error, setError] = useState(null);
    const params = useParams()
    const urlTourReserved = `https://accurate-spontaneity-production.up.railway.app/api/productos/${params.id}`;
    const navigate = useNavigate();
  
    
    useEffect(()=>{
        axios(urlTourReserved)
        .then((res) => setReserved(res.data))
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

    useEffect(() => {
      const userActive = localStorage.getItem("userActive", state.userActive);
      if (!userActive ) {
        navigate('/'); // Redirigir al Home si Cierra sesión.
      }
    }, [state.userActive]);
    
    // Formatear la fecha con toLocaleDateString
    const formatToLocaleDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
      });
    };  
      
    const handleSubmit = async (e) =>{
      e.preventDefault();
  
    // Formatear la fecha en dos formatos: 
    // - Para mostrar al usuario en DD/MM/YYYY
    // - Para enviar al backend en YYYY-MM-DD
      const dateReservation = new Date(state.dataReserved).toISOString().split('T')[0];  // Enviar como YYYY-MM-DD
      const tourId = params.id;
      const usuarioId = state.userId; 

      try {
         const response = await  axios.post('https://accurate-spontaneity-production.up.railway.app/reservar/registrar', {
          usuarioId,
          productoId:tourId,
          fechaReserva:dateReservation // Enviar como YYYY-MM-DD
          });
          // GUARDAMOS EL ID DE LA RESERVA EN UNA CONSTANTE 
          const reservationId = response.data.id;
          dispatch({ type:"SET_ID_RESERVATION", payload:reservationId})
          navigate('/login'); // Redirige al login después de un registro exitoso
      } catch (err) {
        setError("Error al realizar la reserva, por favor prueba mas tarde");
        console.error(err);
      } 
      navigate(`/reservationConfirmed/${state.reservationId}`)
    }
  
    return (
    <div className="container-reservation">
         
        <div className="info-tour-reserved">
        <h2>{reserved.nombre}</h2>
        <img className='img-tour-reserved' src={reserved.imagenUrl} alt="img-tour" />
        <p>{reserved.descripcion}</p>
        </div>
       
        <div className="card-booking-reservation">
          <p className='title-reservation'>RESERVA TU LUGAR</p>
          <div className="info-card-booking-reservation ">
            <p>Nombre: {state.userName} {state.userSurname}</p>
            <p>Email: {state.userEmail}</p>
            {/* Mostrar la fecha en formato DD/MM/YYYY */}
            <p>Fecha: {new Date(state.dataReserved).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}</p>
            <p>Personas: {state.people}</p>
        </div>
       <p className='price-reserved'>Total: USD {state.priceReserved}</p>
        <Button onClick={handleSubmit} className={"btn-booking"}>Confirmar Reserva</Button>
        {error && <p className="error-message">{error}</p>}
        </div>
        <div className='container-btn-back'>
        <Button onClick={()=>navigate(-1)} className="btn-back-reserved">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          </div>
    </div>
  )
}

export default Reservation;