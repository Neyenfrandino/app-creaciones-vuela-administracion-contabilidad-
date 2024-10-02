import {Link} from 'react-router-dom';
import './analytics_current.style.scss';


const AnalyticsCurrent = ({ dataAdmin }) => {
    return (
        <div className="analytics_current__container">
            <div className="analytics_current__title">
                <h4 className="analytics_current__title">Estadisticas actuales</h4> 
            </div>

            <Link to="/super-admin-perfil-usuario" className="analytics_current__content">
                <div className="analytics_current__image-product">
                    <img src={dataAdmin.image} alt="imageProduct" />
                </div >

                <div className="analytics_current__data-product">
                    <h5 className="analytics_current__title">{dataAdmin.title}</h5>
                    <span className="analytics_current__date">({dataAdmin.fecha})</span>
                    <span>Total de ventas del mes: {dataAdmin.totalVentas}</span>
                    <span>Ingresos totales por ventas: {dataAdmin.ingresos}</span>

                </div>
            </Link>
        </div>    
    )
}

export default AnalyticsCurrent;