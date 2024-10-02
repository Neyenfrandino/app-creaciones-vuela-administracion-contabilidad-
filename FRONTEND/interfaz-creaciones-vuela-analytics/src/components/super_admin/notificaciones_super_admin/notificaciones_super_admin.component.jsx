import './notificaciones_super_admin.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const NotificacionesSuperAdmin = () => {

    const handleClick = () => {
        console.log("NotificacionesSuperAdmin");
    }

    return (
        <div className="notificaciones_super_admin__container">
            <h5>Notificaciones</h5>

            <div className="notificaciones_super_admin__content">
                <div className="notificaciones_super_admin__content__title">
                    <h5>Nuevo products añadidos</h5>
                </div>

                <div className="notificaciones_super_admin__content__button">
                    <button onClick={handleClick}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </div>

    )

}

export default NotificacionesSuperAdmin;