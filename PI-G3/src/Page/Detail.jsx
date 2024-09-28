import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser, faClock, faCalendarAlt, faComments, faMobileAlt , faShareAlt, faPaw } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useTourState } from "../Context/GlobalContext";
import MapComponent from "../Components/MapComponent";
import Carrusel from "../Components/Carrusel";
import Calendar from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import ShareModal from "../Components/ShareModal";
import { useInView } from 'react-intersection-observer';

import Policies from "../Components/Policies";
import { format } from "date-fns";


const Detail = () => {
  const [tour, setTour] = useState([]);
  const { state, dispatch } = useTourState();
  const [peopleCount, setPeopleCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservedDates, setReservedDates] = useState([]); // Estado para las fechas reservadas
  const totalPrice = peopleCount * parseFloat(tour.precio);
  const navigate = useNavigate();
  const params = useParams();
  const url = `https://accurate-spontaneity-production.up.railway.app/api/productos/${params.id}`;
  const reservedDatesUrl = `https://accurate-spontaneity-production.up.railway.app/reservar/producto/${params.id}`; // URL para obtener las fechas reservadas
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const { ref: sectionTwoRef, inView: sectionTwoInView } = useInView({
    triggerOnce: true, // La animación se activa solo una vez en true 
    threshold: 0.2,    // Porcentaje del elemento visible para activar la animación
  });

  const handleOpenShareModal = () => {
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
  };

  useEffect(() => {
    const activeUser = localStorage.getItem("userActive") === "true";
    if (activeUser) {
      dispatch({ type: "SET_USER_ACTIVE", payload: true });
    }

  }, [dispatch]);

  // useEffect para guardar la fecha que selecciona el usuario en el contexto global, para esto necesitamos cambiarle el formato ya que react no guarda obejtos en estado global no los renderiza
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy/MM/dd');
      dispatch({ type: "SET_DATE_RESERVED", payload: formattedDate });
    }
    const people = peopleCount
    if(peopleCount)
    dispatch({type: "SET_PEOPLE",payload: people})

    if(totalPrice)
    dispatch({type:"SET_PRICE_RESERVED",payload:totalPrice})

}, [dispatch, selectedDate,peopleCount]);



  useEffect(() => {
    axios.get(url).then((res) => setTour(res.data));
  }, [params.id]);

  useEffect(() => {
    axios.get(reservedDatesUrl).then((res) => {
      // Convertir las fechas reservadas a objetos Date y sumar un día
      const dates = res.data.map(reservation => {
        const date = new Date(reservation.fechaReserva);
        // Sumar un día
        date.setDate(date.getDate() + 1);
        return date;
      });
      setReservedDates(dates);
    });
  }, [params.id]);

  const handlePeopleChange = (event) => {
    setPeopleCount(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  

  const handleClick = () => {
    if (!state.userActive) {
      navigate("/login");
    } else if (selectedDate === null) {
      alert("Selecciona una fecha para reservar");
    } else {
      navigate(`/reservation/${params.id}`);
      
    }
    
  };

    // Función para comprobar si el ítem contiene alguna de las palabras clave
    const containsAny = (text, keywords) => {
      return keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
    };

  // Procesar detalleItinerario para convertirlo en una lista con íconos
  const icons = {
    edades: faUser,
    duracion: faClock,
    horario: faCalendarAlt,
    guia: faComments,
    entrada: faMobileAlt,  // Icono para 'entrada'
    animal: faPaw
  };

  // Separar por salto de línea y puntos
  const itineraryItems = tour.detalleItinerario ? tour.detalleItinerario
    .split(/\n|\./)  // Separar por salto de línea o punto
    .filter(item => item.trim())  // Eliminar elementos vacíos
    .map((item, index) => {
      // Determinar el tipo de información basado en el contenido
      let icon = null;
      const itemLowerCase = item.toLowerCase();
      if (containsAny(itemLowerCase, ["edades", "edad"])) {
        icon = icons.edades;
      } else if (itemLowerCase.includes("duración")) {
        icon = icons.duracion;
      } else if (containsAny(itemLowerCase, ["hora", "horario"])) {
        icon = icons.horario;
      } else if (itemLowerCase.includes("guía")) {
        icon = icons.guia;
      } else if (itemLowerCase.includes("entrada")) {
        icon = icons.entrada;
      } else if (itemLowerCase.includes("animal")) {
        icon = icons.animal;
      }

      return (
        <li key={index} className="list-item">
          {icon && <FontAwesomeIcon icon={icon} className="list-icon" />}
          {item.trim()}
        </li>
      );
    }) : [];
 
 
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);


  return (
    <main className="container-detail">
      <div className="detail-title">
      <h4>{tour.nombre}</h4>
  <button className="btn-share" onClick={handleOpenShareModal}>
    <FontAwesomeIcon icon={faShareAlt} />
  </button>
</div>
      <section className="section-one">

          <div className="img-carrusel">
            <Carrusel
              images={[tour.imagenUrl, tour.imagenUrl2, tour.imagenUrl3]}
            />
          </div>
          <div className="img-detalle">
          <img src={tour.imagenUrl} alt="Imagen 1" className="img-principal" />
          <div className="img-secundarias">
          <img src={tour.imagenUrl2} alt="Imagen 2" className="img-secundaria secundaria1"/>
          <img src={tour.imagenUrl3} alt="Imagen 3" className="img-secundaria secundaria2"/>
          </div>

        </div>
          <div className="info-booking">
            <div>
            <h3>Descripción general</h3>
              <span className="descripcion-larga">{tour.descripcionLarga}</span>
              <p>
                Desde: USD {" "}
                <span className="price-info-booking">{tour.precio}</span> por
                adulto
              </p>
            </div>
          </div>

          <div className="card-booking">
          <h3>Reserva tu lugar</h3>
          <div className="info-card-booking">
            <Calendar
              selected={selectedDate} 
              onChange={handleDateChange}
              placeholderText="Selecciona una fecha"
              excludeDates={reservedDates} // Excluir las fechas reservadas
              /* minDate={new Date()} */ // Opcional: Evita seleccionar fechas pasadas
              minDate={tomorrow}
              dateFormat="dd-MM-yyyy" // Formato de la fecha
            />
            <div className="people-selection">
              <label htmlFor="people-count">Personas:</label>
              <select
                id="people-count"
                value={peopleCount}
                onChange={handlePeopleChange}
              >
                {[...Array(10).keys()].map((number) => (
                  <option key={number + 1} value={number + 1}>
                    {number + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <span className="price-total">Total: USD {totalPrice.toFixed(2)}</span>
          <Button 
            className="btn-booking" 
            onClick={handleClick}
            disabled={!state.userActive || selectedDate === null}
          >
            {state.userActive ? "Iniciar Reserva" : "Iniciar sesión para reservar"}
          </Button>
          <span className="tax">
            El precio incluye impuestos y tarifas de reservación.
          </span>
        </div>


        
      </section>
      


      <section
        ref={sectionTwoRef}
        className={`section-two ${sectionTwoInView ? 'animate visible' : 'animate'}`}
      >
        <div className="travel">
          <div className="itinerary">
            <h3>Itinerario</h3>
            <ul className="itinerary-list">
              <p>{tour.itinerario}</p>
            </ul>
          </div>
        </div>
        <div className="property bordealamitad">
          <ul className="property-list">
            {itineraryItems}
          </ul>
        </div>
        <div className="map-container">
          <MapComponent ubicacion={tour.ubicacion} />
        </div>
      </section>
      <div className="btn-detail">
        <Button onClick={() => navigate(-1)} className="btn-back">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
      </div>
      <Policies />
      <ShareModal
        isOpen={isShareModalOpen}
        onRequestClose={handleCloseShareModal}
        product={tour}
      />
    </main>
  );
};

export default Detail;
