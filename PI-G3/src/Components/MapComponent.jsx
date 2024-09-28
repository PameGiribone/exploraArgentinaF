import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { provinciasArgentinas } from './utils/provinciasArgentinas';
import { useParams } from 'react-router-dom';
import axios from 'axios';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapComponent = ({ ubicacion }) => {
  //const [tour, setTour] = useState(null); 
  //const params = useParams();
  const [position, setPosition] = useState([0, 0]);
  //const url = `https://accurate-spontaneity-production.up.railway.app/api/productos/${params.id}`;

 /*  useEffect(() => {
    axios.get(url)
      .then((res) => setTour(res.data))
      .catch((error) => {
        console.error("Error fetching tour data:", error);
      });
  }, [params.id]);

  // Verifica si tour es nulo o si las coordenadas están definidas
  if (!tour || !tour.latitud || !tour.longitud) {
    return <div>Cargando mapa o no hay datos disponibles.</div>;
  }

  const position = [tour.latitud, tour.longitud];
 */
  useEffect(() => {
    const ciudadSeleccionada = provinciasArgentinas.find(prov => prov.ciudad === ubicacion);
    if (ciudadSeleccionada) {
      setPosition([ciudadSeleccionada.latitud, ciudadSeleccionada.longitud]);
    }
  }, [ubicacion]);

  if (position[0] === 0 && position[1] === 0) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: '280px', width: '100%' }} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
      />
      <Marker position={position}>
        <Popup>
          Usted está aquí. Ubicación seleccionada: {ubicacion}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
