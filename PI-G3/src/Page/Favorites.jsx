import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardTour from '../Components/CardTour';
import Button from '../Components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useTourState } from '../Context/GlobalContext';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const { state } = useTourState();

    useEffect(() => {
      const userActive = localStorage.getItem("userActive", state.userActive);
      if (!userActive ) {
        navigate('/'); // Redirigir al Home si Cierra sesión.
      }

        // Obtener favoritos del localStorage y cargar los detalles
        const fetchFavorites = async () => {
            const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
            if (favoriteIds.length > 0) {
                try {
                    const responses = await Promise.all(
                        favoriteIds.map(id => axios.get(`https://accurate-spontaneity-production.up.railway.app/api/productos/${id}`))
                    );
                    setFavorites(responses.map(res => res.data));
                } catch (error) {
                    console.error("Error al cargar los favoritos:", error);
                }
            }
        };

        fetchFavorites();
    }, [state.userActive]);

    const handleRemoveFavorite = async (productoId) => {
        const userId = localStorage.getItem("userId");

        try {
            await axios.delete('https://accurate-spontaneity-production.up.railway.app/favoritos/eliminarFavorito', {
                data: { usuarioId: userId, productoId: productoId }
            });

            // Actualiza el estado local y localStorage
            setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== productoId));
            localStorage.setItem("favorites", JSON.stringify(favorites.filter(fav => fav.id !== productoId).map(fav => fav.id)));
        } catch (error) {
            console.error("Error al eliminar el favorito:", error);
        }
    };

    return (
        <main className='main-favorites'>
            <div className="container-favorites">
                <h1 className='title-favorites'>Mis Tours favoritos</h1>
                <div className="card-favorites">
                    {favorites.length > 0 ? (
                        favorites.map(fav => (
                            <CardTour item={fav} key={fav.id}>
                                <Button className={"btn-fav"} onClick={() => handleRemoveFavorite(fav.id)}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </Button>
                            </CardTour>
                        ))
                    ) : (
                        <p>No tienes favoritos guardados.</p>
                    )}
                </div>
            </div>
            <div className='btn-back-container'>
                <Button onClick={() => navigate(-1)} className="btn-back-favorites">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
            </div>
        </main>
    );
}

export default Favorites;
