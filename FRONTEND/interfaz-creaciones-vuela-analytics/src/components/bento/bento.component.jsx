import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faBoxes, 
  faShoppingCart, 
  faTags, 
  faCalculator, 
  faWarehouse, 
  faCogs, 
  faChartLine, 
  faMoneyBillAlt 
} from '@fortawesome/free-solid-svg-icons';


import './bento.style.scss'

const Bento = ({data}) => {
    
    const iconMapping = {
        faUsers: faUsers,
        faBoxes: faBoxes,
        faShoppingCart: faShoppingCart,
        faTags: faTags,
        faCalculator: faCalculator,
        faWarehouse: faWarehouse,
        faCogs: faCogs,
        faChartLine: faChartLine,
        faMoneyBillAlt: faMoneyBillAlt
      };
      
      return(
        <div className='bento__container'>   
            {data.map((item, index) => (
                
                <Link 
                    to={item.route} // Asegúrate de que este sea el path correcto
                    key={index} 
                    className={`bento-item`}
                >
                    <div className='bento-item-content'>
                        <span className='icon'><FontAwesomeIcon icon={iconMapping[item.icon]} /></span>
                        <span className='title'>{item.section_title}</span>
                    </div>
                </Link>
            ))}
        
        </div>

    )
}

export default Bento;