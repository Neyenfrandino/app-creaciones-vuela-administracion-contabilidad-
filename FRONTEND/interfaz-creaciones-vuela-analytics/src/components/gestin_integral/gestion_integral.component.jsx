import { useContext, useEffect, useState, useCallback, useReducer } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ContextQuery } from '../../context/contexts_query/contexts_query.jsx';

import CheckUpdateAction from '../check_update_action/check_update_action.component.jsx';
import ButtonBack from '../button_back/button_back.component.jsx';
import RenderInventario from '../render_pages_component/render_inventario/render_inventario.component.jsx';
import RenderUser from '../render_pages_component/render_user/render_user.component.jsx';

import Loading from '../loading/loading.component.jsx';
import './gestion_integral.style.scss';

const INITIAL_STATE = {
    isDataCurrentRoute: {},
    isNewData: {},
    isLoading: false
}

const actionTypes = {
    SET_DATA_CURRENT_ROUTE: 'SET_DATA_CURRENT_ROUTE',
    SET_DATA_SECUNDARY_ROUTE: 'SET_DATA_SECUNDARY_ROUTE',
    SET_NEW_DATA: 'SET_NEW_DATA',
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_DATA_CURRENT_ROUTE:
            return { ...state, isDataCurrentRoute: action.payload };
        case actionTypes.SET_NEW_DATA:
            return { ...state, isNewData: action.payload };
        default:
            return state;
    }
}


const GestionIntegral = ({ dataGestionStock, dataUrls }) => {
    
    const { route } = useParams();
    const location = useLocation();
    const currentPath = location.pathname;
    const currentRoute = route || currentPath.split('/')[1];

    const { setkeyQuery, sell, products, profile, keyQuery, category, isLoading } = useContext(ContextQuery);
    // console.log(sell, 'sell')
    const routeData = dataGestionStock.find(item => item.route === currentRoute);

    const { section, actions } = routeData || { section: {}, actions: [] };

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const { isDataCurrentRoute, isNewData } = state;

    const setIsDataCurrentRoute = (data) => {
        dispatch({ type: actionTypes.SET_DATA_CURRENT_ROUTE, payload: data });
    }

    const setIsNewData = (data) => {
        dispatch({ type: actionTypes.SET_NEW_DATA, payload: data });
    }   

    useEffect(() => {
        if(!products && sell){
            console.log('hola mundo')
            setkeyQuery(isDataCurrentRoute)
            return
        }

        if(products && !category){
            console.log('hola')
            setkeyQuery({'category': null, 'action': 'get'})
            return
        }

        if(category && !products){
            console.log('mundo')
            setkeyQuery(isDataCurrentRoute)
            return
        }

    }, [setIsDataCurrentRoute, dataUrls]);

    
    const handleSaveChanges = (data) => {
        // Validar que data sea "Si" para proceder
        if (data !== 'Si') {
            console.log('Operación cancelada.');
            setIsNewData('');
            return;
        }

    
        // Obtener la acción desde isNewData o isDataCurrentRoute
        const action = isNewData?.action || isDataCurrentRoute?.action;
    
        if (['update', 'create', 'delete'].includes(action)) {
            console.log(`${action} en proceso...`);
            setkeyQuery(isNewData);

            setIsNewData('');
        } else {
            console.warn('Acción desconocida. No se realizará ninguna operación.');
            setIsNewData('');
        }
    };
    
  
    return ( 
        <div className="gestion_stock__container">
            <ButtonBack />
            <div className="gestion_stock__content">
            {isLoading ? <Loading isLoading={isLoading} /> : null}

                <header className='gestion_stock__header'>
                    <h1>{section.title}</h1>
                </header>
                
                <RenderInventario
                    setIsDataCurrentRoute={setIsDataCurrentRoute}
                    currentRoute={currentRoute}
                    products={products || keyQuery.products}
                    sell_product={keyQuery.sell ? keyQuery.sell : sell}
                    category={keyQuery.category ? keyQuery.category : category}
                    setIsNewData={setIsNewData}
                />


                <RenderUser
                    currentRoute={currentRoute}
                    dataUser_db={keyQuery.profile ? keyQuery.profile : profile}
                    setIsNewData={setIsNewData}
                    actionTypes={actions}
                />

            </div>

            {
                isNewData.action && isNewData.action !== 'get' || isDataCurrentRoute.action !== 'get' && isDataCurrentRoute.action ? (
                    <div className='gestion_stock__container--check'>
                        <CheckUpdateAction handleOnClick={handleSaveChanges} />
                    </div>
                ): null
            }
        </div>
    );

}

export default GestionIntegral;


