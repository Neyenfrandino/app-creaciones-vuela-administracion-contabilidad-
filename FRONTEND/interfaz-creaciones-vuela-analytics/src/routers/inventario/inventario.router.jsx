import { useContext, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Bento from '../../components/bento/bento.component';
import GestionIntegral from '../../components/gestin_integral/gestion_integral.component';
import { ContextQuery } from '../../context/contexts_query/contexts_query.jsx';
import './inventario.style.scss'

const InventarioRouter = ({dataInventario}) => {
    const { setkeyQuery, sell_products } = useContext(ContextQuery);

    const dataSelected = dataInventario.filter(item => item.section.title.includes('Gestión'));
    const [dataUrl, setDataUrl] = useState(dataInventario);
    
    const isPage = useLocation().pathname == '/inventario';

    console.log(sell_products, 'sell_products')

    const setDataMainPage = (dataUrl) => {  
        setkeyQuery({
            [dataUrl]: null,
            action: 'get'
        })

        if(dataUrl === 'sell-products' && sell_products){
            setkeyQuery({'products': null, 'action': 'get'})
        }
        
        setDataUrl({
            [dataUrl]: null,
            action: 'get'
        });
    }

    return(
        <div className='inventario__container'>
            {
                isPage ? (
                    <div className='inventario__header'>
                        <h1>Gestión de Inventario</h1>
                    </div>
                ): null
            }
         

            <Routes>
                <Route index element={<Bento data={dataSelected} setDataMainPage={setDataMainPage} />} />
                <Route path=":route" element={<GestionIntegral dataGestionStock={dataSelected} dataUrls={dataUrl} />} />
            </Routes>
        </div>
    )
}

export default InventarioRouter