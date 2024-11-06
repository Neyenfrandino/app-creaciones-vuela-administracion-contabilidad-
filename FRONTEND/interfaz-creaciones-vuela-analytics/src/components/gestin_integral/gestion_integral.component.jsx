import { useContext, useEffect, useState, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ContextQuery } from '../../context/contexts_query/contexts_query.jsx';

import CheckUpdateAction from '../check_update_action/check_update_action.component.jsx';
import ButtonBack from '../button_back/button_back.component.jsx';
import RenderInventario from '../render_pages_component/render_inventario/render_inventario.component.jsx';
import RenderUser from '../render_pages_component/render_user/render_user.component.jsx';

import './gestion_integral.style.scss';

const GestionIntegral = ({ dataGestionStock }) => {

    const { route } = useParams();
    const location = useLocation();
    const currentPath = location.pathname;
    const currentRoute = route || currentPath.split('/')[1];

    const { setkeyQuery, dataUser_db, setDataUser_db } = useContext(ContextQuery);

    const [actionFunc, setActionFunc] = useState({ [currentRoute]: 'get' });
    const [updatedUserData, setUpdatedUserData] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [shouldFetchData, setShouldFetchData] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);


    const routeData = dataGestionStock.find(item =>
        item.route === currentRoute
    );

    const { section, actions } = routeData || { section: {}, actions: [] };

    // Separar el efecto de obtención inicial de datos
    useEffect(() => {
        if (shouldFetchData && modalOpen === false) {
            setkeyQuery({ [currentRoute]: 'get' });
            setShouldFetchData(false);
        }
    }, [currentRoute, setkeyQuery, shouldFetchData, modalOpen, ]);

    // Manejar cambios en actionFunc
    useEffect(() => {
        if (actionFunc[currentRoute] === 'delete') {
            setIsConfirmationOpen(true);
        } else if (actionFunc[currentRoute] === 'get_products' && modalOpen === true) {
            // console.log('hola mundo')
            setkeyQuery({ [currentRoute]: 'get_products' });
            setShouldFetchData(true);
        }
    }, [actionFunc, currentRoute]);

    const handleActionFunc = useCallback((key) => {
        setActionFunc({ [currentRoute]: key });
    }, [currentRoute]);


    const handleUserStateChange = useCallback((newState, typeFunc) => {
        setUpdatedUserData({ newState, typeFunc });
    }, []);


    const handleSaveChanges = useCallback((option) => {
        if (option === 'Si') {
            if (actionFunc[currentRoute] === 'delete') {
                setkeyQuery(actionFunc);
            } else if (updatedUserData?.typeFunc === 'update') {
                setkeyQuery({ [currentRoute]: updatedUserData });
                setDataUser_db(prevData => ({
                    ...prevData,
                    ...updatedUserData.newState
                }));
            } else if (updatedUserData?.typeFunc == "create") {

                setkeyQuery({ [currentRoute]: updatedUserData });
            }
        }

        setIsConfirmationOpen(false);
        setActionFunc({ [currentRoute]: 'get' });
        setShouldFetchData(true);
    }, [actionFunc, currentRoute, updatedUserData, setkeyQuery, setDataUser_db]);

    const openConfirmation = useCallback(() => {
        setIsConfirmationOpen(true);
    }, []);

    return ( 
        <div className="gestion_stock__container">
            <ButtonBack />
            <div className="gestion_stock__content">
                <header className='gestion_stock__header'>
                    <h1>{section.title}</h1>
                </header>

                <RenderInventario
                    currentPath={currentPath}
                    dataUser_db={dataUser_db}
                    openConfirmation={openConfirmation}
                    handleUserStateChange={handleUserStateChange}
                    handleActionFunc={handleActionFunc}
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                />


                <RenderUser
                    currentPath={currentPath}
                    dataUser_db={dataUser_db}
                    openConfirmation={openConfirmation}
                    handleUserStateChange={handleUserStateChange}
                    actionFunc={actionFunc[currentRoute]}
                    dataFunc={actions}
                    handleActionFunc={handleActionFunc}
                />

            </div>

            {isConfirmationOpen && (
                <div className='gestion_stock__container--check'>
                    <CheckUpdateAction handleOnClick={handleSaveChanges} />
                </div>
            )}
        </div>
    );
};

export default GestionIntegral;