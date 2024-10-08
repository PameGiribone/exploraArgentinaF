import React, { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { reducer } from '../reducers/reducers';

const TourState = createContext();

const initialState = {
    tour: [],
    user: null,  // Cambiado para almacenar un solo objeto de usuario en lugar de un array
    userActive: false,
    userName: "",
    userSurname: "",
    userEmail: "",
    userAdministrator: false,
    userId: "",
    categories:[],
    dataReserved: "",
    people: null,
    priceReserved:null,
    reservationId:null,
    showSearchForm: false  // Estado para controlar si el formulario de búsqueda se muestra
}

const GlobalContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const tourUrl = 'https://accurate-spontaneity-production.up.railway.app/api/productos/aleatorios'
    const urlCategories = 'https://accurate-spontaneity-production.up.railway.app/api/productos/categorias/aleatorias'
    
    useEffect(() => {
      axios.get(tourUrl)
        .then((res) => dispatch({ type: "GET_PRODUCTOS", payload: res.data }))        
        .catch((err) => console.log(err))
    }, []);

    useEffect(()=>{
        axios.get(urlCategories)
        .then((res)=> dispatch({type:"GET_CATEGORIES", payload:res.data}))
    },[])


    const loginUser = (email, password) => {
        return axios.post('https://accurate-spontaneity-production.up.railway.app/usuarios/login', { email, password: password })
            .then((res) => {
                dispatch({ type: "SET_USER", payload: res.data });
                return res.data;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    };

    return (
        <TourState.Provider value={{ state, dispatch, loginUser }}>
            {children}
        </TourState.Provider>
    )
}

export default GlobalContext;

export const useTourState = () => {
    return useContext(TourState);
}