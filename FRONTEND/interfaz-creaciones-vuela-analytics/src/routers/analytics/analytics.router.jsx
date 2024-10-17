import { useContext } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import ButtonBack from '../../components/button_back/button_back.component';

import {ContextQuery} from '../../context/contexts_query/contexts_query';
import AnalyticsVentas from '../../components/analytics/analytics__ventas/analytics__ventas.component';
import Bento from '../../components/bento/bento.component';


import './analytics.style.scss';

const AnalyticsRouter = ({dataAnalytics}) => {
    const { setkeyQuery } = useContext(ContextQuery);

    const filteredData = dataAnalytics.filter(item => item.section_title.includes('Análisis'));
    // console.log(filteredData);

    const location = useLocation();
    const isAuthPage = location.pathname === '/estadisticas';
    

    return (
        <div className='analytics__container'>
            {
                isAuthPage ? (
                    <div className='analytics__title'>
                        <h1>Analytics general</h1>
                    </div>
                ): null

            }
        
            {isAuthPage ? (
                <Bento data={dataAnalytics} />
            ) : null}
        
            <Routes>
                <Route path='/analytics__ventas' element={<AnalyticsVentas />} />
                <Route path='/dashboard' element={<h1>chau pao</h1>} />
                <Route path='/users' element={<h1>Users</h1>} />
                <Route path='/sessions' element={<h1>Sessions</h1>} />
                <Route path='/pages' element={<h1>Pages</h1>} />
            </Routes>
        
        
        </div>
    )   

}

export default AnalyticsRouter;