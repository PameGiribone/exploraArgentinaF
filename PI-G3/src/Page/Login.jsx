import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTourState } from '../Context/GlobalContext';
import Form from '../Components/Form';
import axios from 'axios';

const Login = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const { dispatch, loginUser } = useTourState();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = data;

        try {
            const user = await loginUser(email, password);
            dispatch({ type: "SET_USER_ACTIVE", payload: true });
            dispatch({ type: "SET_USER_NAME", payload: user.nombre });
            dispatch({ type: "SET_USER_SURNAME", payload: user.apellido });
            dispatch({ type: "SET_USER_EMAIL", payload: user.email });
            dispatch({ type: "SET_USER_ADMINISTRATOR", payload: user.esAdministrador });
            dispatch({ type: "SET_USER_ID", payload: user.id });

            localStorage.setItem("userActive", true);
            localStorage.setItem("userName", user.nombre);
            localStorage.setItem("userSurname", user.apellido);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userAdministrator", user.esAdministrador);
            localStorage.setItem("userId", user.id);

            // Obtener y guardar solo los IDs de los favoritos del usuario
            const { data: favoritos } = await axios.get(`https://accurate-spontaneity-production.up.railway.app/favoritos/listarFavoritos/${user.id}`);
            const favoriteIds = favoritos.map(fav => fav.productoId);
            localStorage.setItem("favorites", JSON.stringify(favoriteIds));
            navigate('/');
        } catch (err) {
            setError("Email o contraseña incorrectos");
        }
    };

    return (
        <main className='main-login'>
            <div className='container-form-login'>
                <p className='title-login'>Iniciar Sesión</p>
                <p className='subtitle-login'>Llegó el momento de explorar!</p>
                <hr className="divider" />
                <Form 
                    className={"form-login"}
                    fields={[
                        { 
                            type: "email", 
                            placeholder: "Correo electrónico", 
                            name: "email", 
                            value: data.email, 
                            onChange: handleChange,
                            autoComplete: "email"
                        },
                        { 
                            type: "password", 
                            placeholder: "Contraseña", 
                            name: "password", 
                            value: data.password, 
                            onChange: handleChange,
                            autoComplete: "current-password"
                        },
                    ]}
                    buttonText="Iniciar Sesión"
                    onSubmit={handleSubmit}
                    inputClassName={"input-login"}
                />
                {error && <p className="error-message">{error}</p>}
                <p className='p-center'><Link to="/forgotpassword">He olvidado mi contraseña</Link></p>
                <p className='p-center'>¿No tienes cuenta? <Link to="/createaccount"><span className='span'>Regístrate aquí</span></Link></p>
            </div>
        </main>
    );
};

export default Login;
