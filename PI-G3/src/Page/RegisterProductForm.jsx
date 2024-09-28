import React, { useEffect, useState } from 'react';
import { useTourState } from '../Context/GlobalContext';
import Form from "../Components/Form";
import CaracteristicasModal from '../Components/CaracteristicasModal';
import axios from 'axios';
import "../style/registerProductForm.css";
import { provinciasArgentinas } from '../Components/utils/provinciasArgentinas';
import { useNavigate } from 'react-router-dom';

const RegisterProductForm = () => {
    const { state, dispatch } = useTourState();
    const [error, setError] = useState(null);
    const [productData, setProductData] = useState({
        nombre: '',
        descripcion: '',
        descripcionLarga: '',
        itinerario: '',
        imagenUrl: '',
        imagenUrl2: '',
        imagenUrl3: '',
        precio: '',
        ubicacion: '',
        detalleItinerario: '',
        categoria: '',
        disponible: true,
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductData({
            ...productData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveCaracteristicas = (caracteristicas) => {
        setProductData(prevData => ({ ...prevData, detalleItinerario: caracteristicas }));
        handleCloseModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, descripcion, descripcionLarga, itinerario, imagenUrl, imagenUrl2, imagenUrl3, precio, ubicacion, detalleItinerario } = productData;
        const nombreExistente = state.tour.find(product => product.nombre.toLowerCase() === nombre.toLowerCase());

        if (!nombre || nombre.length < 3 || nombre.length > 50 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
            setError("El campo nombre es incorrecto");
            return;
        }
        if (nombreExistente) {
            setError("El nombre ingresado ya existe");
            return;
        }
        if (descripcion.length < 4 || descripcion.length > 250) {
            setError("El campo de descripción breve de portada es incorrecto");
            return;
        }
        if (descripcionLarga.length < 100 || descripcionLarga.length > 2000) {
            setError("El campo de descripción detallada es incorrecto");
            return;
        }
        if (itinerario.length < 5 || itinerario.length > 500) {
            setError("El campo de itinerario es incorrecto");
            return;
        }
        if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(imagenUrl)) {
            setError("El campo de imagen 1 es incorrecto");
            return;
        }
        if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(imagenUrl2)) {
            setError("El campo de imagen 2 es incorrecto");
            return;
        }
        if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(imagenUrl3)) {
            setError("El campo de imagen 3 es incorrecto");
            return;
        }

        const precioNum = parseFloat(precio);
        if (isNaN(precioNum) || precioNum <= 0) {
            setError("El campo de precio es incorrecto");
            return;
        }

        if (!productData.ubicacion) {
            setError("Debe seleccionar una ubicación");
            return;
        }

        if (detalleItinerario.length < 20 || detalleItinerario.length > 2000) {
            setError("El campo característica es incorrecto");
            return;
        }

        if (!productData.categoria) {
            setError("Debe seleccionar una categoría");
            return;
        }

        setError(null);

        axios.post('https://accurate-spontaneity-production.up.railway.app/api/productos/agregarProducto', productData)
            .then((res) => {
                dispatch({ type: "ADD_PRODUCTO", payload: res.data });
                alert("Producto registrado exitosamente!");
                setProductData({
                    nombre: '',
                    descripcion: '',
                    descripcionLarga: '',
                    itinerario: '',
                    imagenUrl: '',
                    imagenUrl2: '',
                    imagenUrl3: '',
                    precio: '',
                    ubicacion: '',
                    detalleItinerario: '',
                    categoria: '',
                    disponible: true,
                });
            })
            .catch((err) => {
                console.log(err);
                alert('Hubo un error al registrar el producto');
            });
    };

    useEffect(() => {
        // Recupera el valor del localStorage y convierte a booleano
        const userAdministrator = localStorage.getItem("userAdministrator") === "true";
        // Verifica si el usuario es administrador y redirige si no lo es
        if (!userAdministrator) {
          navigate('/'); // Redirigir fuera del panel de administración
        }
    }, [state.userAdministrator, navigate]);

    const fields = [
        { type: 'label', label: "Nombre", className: "create-account-input", name: 'nombre', value: productData.nombre, onChange: handleChange },
        { type: 'label', label: "Descripción", name: 'descripcion', value: productData.descripcion, onChange: handleChange },
        { type: 'label', label: "Descripción Detallada", name: 'descripcionLarga', value: productData.descripcionLarga, onChange: handleChange },
        { type: 'label', label: "Itinerario", name: 'itinerario', value: productData.itinerario, onChange: handleChange },
        { type: 'label', label: "URL Imagen 1 (debe ser jpg,jpeg, png o gif)", name: 'imagenUrl', value: productData.imagenUrl, onChange: handleChange },
        { type: 'label', label: "URL Imagen 2 (debe ser jpg,jpeg, png o gif)", name: 'imagenUrl2', value: productData.imagenUrl2, onChange: handleChange },
        { type: 'label', label: "URL Imagen 3 (debe ser jpg,jpeg, png o gif)", name: 'imagenUrl3', value: productData.imagenUrl3, onChange: handleChange },
        { type: 'label', label: "Precio", name: 'precio', value: productData.precio, onChange: handleChange },
        { type: 'select', label: "Ubicación", name: 'ubicacion', value: productData.ubicacion, onChange: handleChange, options: [{ value: '', label: 'Seleccionar ubicación' }, ...provinciasArgentinas.map(prov => ({ value: prov.ciudad, label: prov.ciudad }))] },
        { type: 'label', label: "Características", name: 'detalleItinerario', value: productData.detalleItinerario, onClick: handleOpenModal, onChange: handleChange }, // Aquí se maneja tanto el onClick como el onChange
        { type: 'select', label: "Categoría", name: 'categoria', value: productData.categoria, onChange: handleChange, options: [{ value: '', label: 'Seleccionar categoría' }, ...state.categories.map(cat => ({ value: cat.id, label: cat.nombre }))] },
        { type: 'checkbox', label: 'Marque el check si quiere que el producto se visualice desde ahora en la página', name: 'disponible', checked: productData.disponible, onChange: handleChange },
    ];

    return (
        <main className="registerProductForm main">
            <div className="container-form-create">
                <h2 className="title-form-create">Registrar Nuevo Producto</h2>
                <Form className={"form-create-accout"} fields={fields} buttonText="Registrar Producto" onSubmit={handleSubmit} inputClassName="input-form-registred" provinciasArgentinas={provinciasArgentinas} />
                {error && <p className="error-message">{error}</p>}
                <CaracteristicasModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveCaracteristicas}
                />
            </div>
        </main>
    );
};

export default RegisterProductForm;
