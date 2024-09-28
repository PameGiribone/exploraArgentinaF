import React, { useState, useRef, useEffect } from "react";
import CardCategories from "../Components/CardCategories";
import Form from "../Components/Form";
import CardTour from "../Components/CardTour";
import Button from "../Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { useTourState } from "../Context/GlobalContext";
import axios from "axios";

const Home = () => {
  const { state, dispatch } = useTourState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchText, setSearchText] = useState("¿A dónde vamos?");
  const [offersText, setOffersText] = useState("Ofertas Especiales");
  const offersRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const userActive = localStorage.getItem("userActive") === "true";
  const [reservedProductIds, setReservedProductIds] = useState([]);
  const { showSearchForm } = state;

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 10; // Cantidad de tours por página

  useEffect(() => {
    if (userActive) {
      dispatch({ type: "SET_USER_ACTIVE", payload: true });
      const userId = localStorage.getItem("userId");
      if (userId) {
        axios
          .get(`https://accurate-spontaneity-production.up.railway.app:8081/favoritos/listarFavoritos/${userId}`)
          .then((response) => {
            const favoriteIds = response.data.map((fav) => fav.productoId);
            setFavorites(favoriteIds);
            localStorage.setItem("favorites", JSON.stringify(favoriteIds));
          })
          .catch((error) => console.error("Error fetching favorites", error));
      }
    }
  }, [dispatch, userActive]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (selectedDate) {
      axios
        .get(
          `https://accurate-spontaneity-production.up.railway.app:8081/reservar/productosPorFecha/${
            selectedDate.toISOString().split("T")[0]
          }`
        )
        .then((response) => {
          const reservedIds = response.data.map((item) => item.productoId);
          setReservedProductIds(reservedIds);
        })
        .catch((error) =>
          console.error("Error fetching reserved products", error)
        );
    }
  }, [selectedDate]);

  const getUniqueLocations = (tours) => {
    const locations = tours.map((tour) => tour.ubicacion);
    const uniqueLocations = [...new Set(locations)];
    return uniqueLocations.map((location) => ({
      value: location.toLowerCase().replace(/\s+/g, "-"),
      label: location,
    }));
  };

  const locationOptions = getUniqueLocations(state.tour);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "TOGGLE_SEARCH_FORM", payload: false }); // Ocultar el formulario después de buscar (opcional)
    if (selectedLocation) {
      setSearchText("Destino seleccionado");
      setOffersText("Destinos Seleccionados");
    }
    if (offersRef.current) {
      offersRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filtra por categoría solo si no se ha seleccionado ubicación ni fecha
  const filteredByCategory = (category) => 
    category ? state.tour.filter((tour) => tour.categoria.id === category) : state.tour;

  const filteredByLocation = selectedLocation
    ? state.tour.filter(
        (tour) =>
          tour.ubicacion.toLowerCase().replace(/\s+/g, "-") === selectedLocation
      )
    : state.tour;

  const filteredByDate = selectedDate
    ? filteredByLocation.filter((tour) => !reservedProductIds.includes(tour.id))
    : filteredByLocation;

  const displayedTours = selectedLocation || selectedDate ? filteredByDate : filteredByCategory(selectedCategory);

  // Obtener tours de la página actual
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = displayedTours.slice(indexOfFirstTour, indexOfLastTour);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedLocation("");
    setSelectedDate(null);
    setSearchText("¿A dónde vamos?");
    setOffersText("Ofertas Especiales");
    setCurrentPage(1); // Reiniciar paginación al cambiar categoría
    if (offersRef.current) {
      offersRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setCurrentPage(1); // Reiniciar paginación al cambiar la ubicación
    if (e.target.value) {
      setSearchText("Destino seleccionado");
    } else {
      setSearchText("¿A dónde vamos?");
    }
  };

  const handleFavoriteToggle = async (tourId) => {
    const userId = localStorage.getItem("userId");
    const isFavorite = favorites.includes(tourId);

    try {
      if (isFavorite) {
        await axios.delete('https://accurate-spontaneity-production.up.railway.app:8081/favoritos/eliminarFavorito', {
          data: { usuarioId: userId, productoId: tourId },
        });
        const updatedFavorites = favorites.filter((id) => id !== tourId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      } else {
        await axios.post('https://accurate-spontaneity-production.up.railway.app:8081/favoritos/agregarFavorito', {
          usuarioId: userId,
          productoId: tourId,
        });
        const updatedFavorites = [...favorites, tourId];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error("Error handling favorites", error);
    }
  };

  // Lógica para cambiar de página
  const handleNextPage = () => {
    if (currentPage < Math.ceil(displayedTours.length / toursPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="container-main">
      <section className="container-search " id="buscador-inicio">
      <div className="video-background">
      <video
        className="video-fondo"
        autoPlay
        muted
        loop
        playsInline
        controls={false} // Opcional, puedes eliminar este atributo si no quieres mostrar controles
      >
        <source src="/img/PortadaExploraArgentina4.mp4" type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>
    </div>
 {/* ACA VA EL ESTADO DE MOSTRAR EL FORMULARIO O NO  */}
 {showSearchForm && (
    <div className="container-form" >
    <p>¿Cuál va a ser tu próxima aventura?</p>
        <Form 
          className={"form"}
          fields={[
            {
              type: "select",
              value: selectedLocation,
              onChange: handleLocationChange,
              // --Ordenar las opciones por orden alfabético
              options: [{ value: "", label: searchText }, ...locationOptions].sort((a, b) => a.label.localeCompare(b.label)),
              // options: [{ value: "", label: searchText }, ...locationOptions]
            },
            {
              type: "custom",
              render: () => (
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecciona una fecha"
                  showTimeSelect={false}
                  className="date"
                  minDate={new Date()}
                />
              ),
            },
          ]}
          buttonText="Buscar"
          onSubmit={handleSearchSubmit}
          inputClassName={"input-select"}
        />
    </div>
    )}
      </section>
      <section className="container-categories">
        <p className="exp">Experiencias</p>
        <p className="subtitle-exp">
          Los destinos más populares de Argentina, desde lugares históricos
          hasta maravillas naturales.
        </p>
        <div className="card-categories">
          {state.categories.map((item, index) => (
            <CardCategories
              key={index}
              item={item}
              onClick={() => handleCategoryClick(item.id)}
            />
          ))}
        </div>
      </section>

      <section className="container-offers" ref={offersRef}>
        <p className="offers">{offersText}</p>
        <p className="subtitle-offers">
          Consulta nuestras ofertas especiales y descuentos.
        </p>
        <div className="container-card-tour">
          {currentTours.map((item, index) => (
            <CardTour key={index} item={item}>
              {userActive && (
                <Button
                  className={`btn-fav ${
                    favorites.includes(item.id) ? "clicked" : ""
                  }`}
                  onClick={() => handleFavoriteToggle(item.id)}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </Button>
              )}
            </CardTour>
          ))}
        </div>
        {/* Paginación */}
        <div className="pagination">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Atrás

            </Button>
      {Array.from(
        { length: Math.ceil(displayedTours.length / toursPerPage) },
        (_, index) => index + 1
      ).map((number) => (
        <Button
          key={number}
          onClick={() => handlePageClick(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </Button>
      ))}
      <Button
        onClick={handleNextPage}
        disabled={currentPage === Math.ceil(displayedTours.length / toursPerPage)}
      >
        Siguiente
      </Button>
    </div>
  </section>
  
</main>

  );
};

export default Home;