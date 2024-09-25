import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/Calendar.css"; // Asegúrate de tener tu CSS personalizado



const Calendar = ({ selectedDate, handleDateChange }) => {
  // Función para agregar una clase a los días anteriores a hoy
  const dayClassName = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ajusta a medianoche para comparación exacta
    if (date < today) {
      return "disabled-date"; // Clase para las fechas no disponibles
    }
    return null;
  };

  return (
    <div>
      {/* <h3>Selecciona la fecha:</h3> */}
      <DatePicker
        selected={selectedDate} // Usa la fecha seleccionada pasada como prop
        onChange={handleDateChange} // Usa la función pasada como prop
        dayClassName={dayClassName} // Añadir la clase a los días
        dateFormat="dd-MM-yyyy" // Formato de la fecha
        minDate={new Date()} // Deshabilitar fechas anteriores a hoy
        placeholderText="Selecciona una fecha"
        showTimeSelect={false} // Eliminar la selección de hora
      />
    </div>
  );
};

export default Calendar;

