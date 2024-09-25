import React, { useState } from 'react'; 
import Modal from 'react-modal';

// Configura el elemento de la aplicación para el modal
Modal.setAppElement('#root');

const CaracteristicasModal = ({ isOpen, onClose, onSave }) => {
    const [edades, setEdades] = useState('');
    const [duracion, setDuracion] = useState('');
    const [horario, setHorario] = useState('');
    const [entrada, setEntrada] = useState(''); // Cambiado a una cadena vacía, "Sí" o "No"
    const [guia, setGuia] = useState('');
    const [bienestarAnimal, setBienestarAnimal] = useState(''); // Nuevo campo

    const ensurePeriod = (value) => value.trim().endsWith('.') ? `${value.trim()} ` : `${value.trim()}. `;

    const handleSave = () => {
        const caracteristicas = [
            edades && `Edades: ${ensurePeriod(edades)}`,
            duracion && `Duración: ${ensurePeriod(duracion)}`,
            horario && `Horario de inicio: ${ensurePeriod(horario)}`,
            entrada === 'Sí' && `Entrada para dispositivos móviles${ensurePeriod('')}`, // Texto fijo
            bienestarAnimal === 'Sí' && `Cumple con las especificaciones de bienestar animal${ensurePeriod('')}`, // Nuevo texto
            guia && `Guía en vivo: ${ensurePeriod(guia)}`
        ]
        .filter(Boolean)
        .join('\n');

        if (typeof onSave === 'function') {
            onSave(caracteristicas);
        }

        if (typeof onClose === 'function') {
            onClose();  // Asegurarse de que se llame la función `onClose`
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}  // Esto permite cerrar con la tecla "Esc" o clic en el fondo
            contentLabel="Características del Producto Modal"
        >
            <div style={{ position: 'relative', padding: '20px' }}>
                <button
                    onClick={onClose}  // Este botón cierra el modal
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer'
                    }}
                >
                    &times;
                </button>
                <h2>Ingrese las Características del Producto</h2>
                <form>
                    <label>
                        Edades:
                        <input
                            type="text"
                            value={edades}
                            onChange={(e) => setEdades(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Duración:
                        <input
                            type="text"
                            value={duracion}
                            onChange={(e) => setDuracion(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Horario de inicio:
                        <input
                            type="text"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                        />
                    </label>
                    <br />
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        Entrada para dispositivos móviles:
                        <select
                            value={entrada}
                            onChange={(e) => setEntrada(e.target.value)}
                            style={{ marginLeft: '10px' }}  // Agrega espaciado entre el texto y el select
                        >
                            <option value="">Seleccionar</option>
                            <option value="Sí">Sí</option>
                            <option value="No">No</option>
                        </select>
                    </label>
                    <br />
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        Cumple con las especificaciones de bienestar animal:
                        <select
                            value={bienestarAnimal}
                            onChange={(e) => setBienestarAnimal(e.target.value)}
                            style={{ marginLeft: '10px' }}  // Agrega espaciado entre el texto y el select
                        >
                            <option value="">Seleccionar</option>
                            <option value="Sí">Sí</option>
                            <option value="No">No</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Guía en vivo:
                        <input
                            type="text"
                            value={guia}
                            onChange={(e) => setGuia(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="button" onClick={handleSave}>Guardar</button>
                </form>
            </div>
        </Modal>
    );
};

export default CaracteristicasModal;
