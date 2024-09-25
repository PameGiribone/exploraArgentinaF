import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const CardTour = ({ item, children }) => {
  const { imagenUrl, nombre, descripcion, precio, id } = item;
  return (
    <div className="card-tour">
      <div className="img-container">
        <img
          className="img-card-tour"
          src={imagenUrl}
          alt="imagen de experiencia"
        />
        {children} {/* Aquí es donde se renderiza el botón de favoritos */}
      </div>
      <div className="info-card-tour">
        <p className="title-card-tour">{nombre}</p> {/* TRAER DE ENDPOINT */}
        <p className="subtitle-card-tour">{descripcion}</p>
        {/* TRAER DE ENDPOINT */}
        <div className="price-card-tour">
          <p>
            Desde:<span className="price"> USD{precio}</span>
          </p>
          {/* TRAER DE ENDPOINT */}
          <Link to={`/detail/${id}`}>
            <Button className="btn-card-tour">Detalles</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardTour;
