import Bento from '../../components/bento/bento.component';
import './inventario.style.scss'

const InventarioRouter = ({dataInventario}) => {

    const dataSelected = dataInventario.filter(item => item.section_title.includes('Gestión'));
    console.log(dataSelected);
    return(
        <div className='inventario__container'>
            <div className='inventario__header'>
                <h1>Gestión de Inventario</h1>
            </div>

            <div className='inventario__content'>
                <Bento data={dataSelected} />
            </div>
        </div>
    )
}

export default InventarioRouter