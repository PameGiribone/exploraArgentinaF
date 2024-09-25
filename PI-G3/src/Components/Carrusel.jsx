// src/components/Carousel.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/Carrusel.css'; // Añadir estilos para el carrusel

const Carousel = ({ images }) => {
//   --Estado para el indice de la imagen actual. Inicializado en 0
  const [currentIndex, setCurrentIndex] = useState(0); 
  //--Funcion para ir a la imagen anterior 
  const goToPrevious = () => {
      //-- Si el indice actual es 0, se cambia al ultimo indice del arreglo, de lo contrario se resta 1 al indice actual
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1)); 
  };
  //--Funcion para ir a la imagen siguiente
  const goToNext = () => {
      //-- Si el indice actual es igual al ultimo indice del arreglo, se cambia al primer indice, de lo contrario se suma 1 al indice actual
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1)); 
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={goToPrevious}>
        &lt;
      </button>
      <div className="carousel-slide">
        {/* Imagen actual del carrusel segun el indice actual del estado currentIndex. */}
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel-image" />
      </div>
      <button className="carousel-button next" onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

Carousel.propTypes = {
    //--Propiedad que recibe un arreglo de strings con las urls de las imagenes
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
