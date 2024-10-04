
import AnalyticsCurrent from '../../components/super_admin/analytics_current/analytics_current.component';
import CardSeguimientoInventario from '../../components/super_admin/card_seguimiento_inventario/card_seguimiento_inventario.component';
import { faBoxes, faClipboardList, faCalculator } from '@fortawesome/free-solid-svg-icons';
import NotificacionesSuperAdmin from '../../components/super_admin/notificaciones_super_admin/notificaciones_super_admin.component';

import './home.scss';


const dataCurrentAnalytics = {
  title: "Análisis de ventas",
  image: "img/logo.jpg",
  totalVentas: "1000",
  ingresos: "1000",
  fecha: "10/12/2022"
}

const dataInventario = [
  {
      title: "Total de productos",
      subTitle: "Inventario actual",
      icon: faBoxes,
      value: "98"
  },
  {
      title: "Materiales",
      subTitle: "Inventario actual",
      icon: faClipboardList,
      value: "98"
  },
  {
      title: "Calculos",
      subTitle: "Inventario actual",
      icon: faCalculator,
      value: "98"
  }
  
]

const Home = () => {

    return (
      <div className="home__container">

        <div className="home__content">
          <h1>Hola</h1>
        </div>

        <div className="home__analytics">
          <AnalyticsCurrent dataAdmin={dataCurrentAnalytics} />
          <CardSeguimientoInventario title="Seguimiento de inventario" data={dataInventario} />
          <NotificacionesSuperAdmin />
        </div>

        
      </div> 
    )
}

export default Home;