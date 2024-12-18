import { useContext, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Bento from '../../components/bento/bento.component';
import GestionIntegral from '../../components/gestin_integral/gestion_integral.component';
import { ContextQuery } from '../../context/contexts_query/contexts_query.jsx';

import Loading from '../../components/loading/loading.component.jsx';
import RenderListProductCategoryFilter from '../../components/render_list_product_category_filter/render_list_product_category_filter.component.jsx';
import ButtonBack from '../../components/button_back/button_back.component.jsx';

import './inventario.style.scss'

const InventarioRouter = ({dataInventario}) => {
    const { setkeyQuery, sell_products, isLoading, category, products, keyQuery } = useContext(ContextQuery);

    const dataSelected = dataInventario.filter(item => item.section.title.includes('Gestión') && !item.section.title.includes('Usuarios'));
    const [dataUrl, setDataUrl] = useState(dataInventario);
    
    const isPage = useLocation().pathname == '/inventario';

    const setDataMainPage = (dataUrl) => {
        console.log(dataUrl)
        setkeyQuery({
            [dataUrl]: null,
            action: 'get'
        })

        setDataUrl(dataUrl)
    }

    return(
        <div className='inventario__container'>
            {
                isLoading ? <Loading isLoading={isLoading} /> : null
            }
            {
                isPage ? (
                    <div className='inventario__header'>
                        <h1>Gestión de Inventario</h1>
                    </div>
                ): null
            }
         
            <div className='inventario__content'>
                <ButtonBack/>
                <Routes>
                    <Route index element={<Bento data={dataSelected} setDataMainPage={setDataMainPage} />} />
                    <Route path=":route" element={<GestionIntegral dataGestionStock={dataSelected} dataUrls={dataUrl}/>}/>
                    <Route 
                        path=":route/:id" 
                        element={<RenderListProductCategoryFilter 
                        products={products ? products : keyQuery.products} setkeyQuery={setkeyQuery} 
                        setDataMainPage={setDataMainPage} />} 
                    />
                </Routes>
            </div>
        </div>
    )
}

export default InventarioRouter