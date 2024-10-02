import './card_seguimiento_inventario.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const CardSeguimientoInventario = ({title, data}) => {
    return (
        <div className="card_seguimiento_inventario__container">
            <h5> {title} </h5>
            {
                data.map((item, index) => {
                    return (
                        <section className="card_seguimiento_inventario__total-products" key={index}>
                            <div className="card_seguimiento_inventario__total-products__icon">
                                <FontAwesomeIcon icon={item.icon} />
                            </div>
    
                            <div className="card_seguimiento_inventario__total-products__data"> 
                                <span className='card_seguimiento_inventario__total-products__data__title'>{item.title}</span>
                                <span>{item.subTitle}</span>
                            </div>
                            <div className="card_seguimiento_inventario__total-products__quantity">
                                <span>{item.value}</span>
                            </div>
                        </section>
                    )
                })

            }
        </div>
    )
}

export default CardSeguimientoInventario;
