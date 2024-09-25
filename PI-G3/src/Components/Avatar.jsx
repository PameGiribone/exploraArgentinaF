import React from 'react';
import "../style/Avatar.css";
import { useTourState } from '../Context/GlobalContext';


const Avatar = () => {
    const { state, dispatch } = useTourState();
    // Obtener las iniciales
    const initials = `${state.userName[0] || ''}${state.userSurname[0] || ''}`.toUpperCase();

    return (
        <div className="avatar">
            {initials}
        </div>
    );
};

export default Avatar;