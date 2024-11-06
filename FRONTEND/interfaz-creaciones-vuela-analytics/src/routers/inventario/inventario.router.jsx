
import { Routes, Route, useLocation } from 'react-router-dom';
import Bento from '../../components/bento/bento.component';
import GestionIntegral from '../../components/gestin_integral/gestion_integral.component';
import './inventario.style.scss'

const InventarioRouter = ({dataInventario}) => {

    const dataSelected = dataInventario.filter(item => item.section.title.includes('Gestión'));
    
    const isPage = useLocation().pathname == '/inventario';

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
                <Route index element={<Bento data={dataSelected} />} />
                <Route path=":route" element={<GestionIntegral dataGestionStock={dataSelected} />} />
            </Routes>
        </div>
    )
}

export default InventarioRouter