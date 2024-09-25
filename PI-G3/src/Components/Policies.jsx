import React from 'react';
import { Drawer } from 'vaul';
// import '../style/Policies.css'; 


const Policies = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDrawer = () => setIsOpen(!isOpen);
    return (
        <Drawer.Root>
           <Drawer.Trigger className="drawer-trigger" onClick={toggleDrawer}>Ver politicas de Canelacion & Reservas</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="drawer-overlay" onClick={toggleDrawer} />
                <Drawer.Content className="drawer-content" data-state={isOpen ? 'open' : 'closed'}>
                
                    <button className="drawer-close-btn" onClick={toggleDrawer}></button>
                    <div className="scrollable-container">
                         <div className="scroll-indicator">
                            <div className="line"></div>
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>
                        <div className="policies-grid">
                        <div className="policie">
                            <h3>Política de Reserva y Cancelación</h3>
                            <p>Las reservas para tours, actividades y paseos deben realizarse con al menos 24 horas de anticipación.</p>
                            <p>Se requiere un depósito del 20% del costo total al momento de la reserva para garantizar la misma. El saldo restante se pagará en el lugar el día de la actividad.</p>

                        </div>
                        <div className="policie">
                            <h3>Política de Reembolso</h3>
                            <p>Las cancelaciones realizadas con al menos 24 horas de anticipación a la fecha del tour tendrán un reembolso del 100% del depósito.</p>
                            <p>Las cancelaciones realizadas con menos de 24 horas de anticipación a la fecha del tour no tendrán reembolso.</p>
                        </div>
                        <div className="policie">
                            <h3>Política de Cancelación</h3>
                            <p>En caso de cancelación por parte del operador, se ofrecerá una nueva fecha para realizar la actividad o un reembolso del 100% del depósito.</p>
                        </div>
                        <div className="policie">
                            <h3>Política de No Presentación</h3>
                            <p>En caso de no presentación el día de la actividad, no se realizará ningún reembolso.</p>
                        </div>
                        <div className="policie">
                            <h3>Política de Cambios</h3>
                            <p>Los cambios en la fecha de la actividad están sujetos a disponibilidad y deben realizarse con al menos 24 horas de anticipación.</p>
                        </div>
                        <div className="policie">
                            <h3>Política de Privacidad</h3>
                            <p>Los datos personales de los usuarios serán utilizados únicamente para la realización de la reserva y no serán compartidos con terceros.</p>
                        </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

export default Policies;