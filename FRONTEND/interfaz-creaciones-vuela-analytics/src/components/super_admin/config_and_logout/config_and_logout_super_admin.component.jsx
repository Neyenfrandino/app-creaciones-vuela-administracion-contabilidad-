
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

import './config_and_logout_super_admin.style.scss';

const ConfigAndLogoutSuperAdmin = ({handleClick}) => { 

    return (
        <div className="config_and_logout_super_admin__container">
            {/* <div className="config_and_logout_super_admin__content"> */}

            <div className="config_and_logout_super_admin__content__config">
                    <button className="config_and_logout_super_admin__content__config__button">
                        <FontAwesomeIcon icon={faCog} style={{ marginRight: '10px' }} /> Configuración 
                    </button>
                </div>

                <div className="config_and_logout_super_admin__content__logout">
                    <button onClick={() => handleClick()} className="config_and_logout_super_admin__content__logout__button">
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} /> Cerrar sesión
                    </button>
                </div> 
            {/* </div> */}

        </div>
    )
}

export default ConfigAndLogoutSuperAdmin; 