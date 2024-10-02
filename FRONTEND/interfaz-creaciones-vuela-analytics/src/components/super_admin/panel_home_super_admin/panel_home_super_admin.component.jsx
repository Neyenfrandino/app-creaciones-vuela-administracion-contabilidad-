import CardAdminData from '../card_admin_data/card_admin_data.component';
import NavSuperAdmin from '../nav_super_admin/nav_super_admin.component';
import ConfigAndLogoutSuperAdmin from '../config_and_logout/config_and_logout_super_admin.component';
import AnalyticsCurrent from '../analytics_current/analytics_current.component';
import CardSeguimientoInventario from '../card_seguimiento_inventario/card_seguimiento_inventario.component';
import NotificacionesSuperAdmin from '../notificaciones_super_admin/notificaciones_super_admin.component';

import { faBoxes, faClipboardList, faCalculator } from '@fortawesome/free-solid-svg-icons';

import './panel_home_super_admin.scss';

const dataAdmin = {
    name: "Neyen Hernández",
    email: "neyenhernandez@gmail.com"
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

const dataCurrentAnalytics = {
    title: "Análisis de ventas",
    image: "img/logo.jpg",
    totalVentas: "1000",
    ingresos: "1000",
    fecha: "10/12/2022"
}

const PanelHomeSuperAdmin = () => {
    return (
        <div className="panel_home_super_admin__container">
            <div className="panel_home_super_admin__content">

                {/* <section className="panel_home_super_admin__section--menu">
                    <div className="panel_home_super_admin__section--menu__card-admin-data">
                        <div>
                            <CardAdminData dataAdmin={dataAdmin} image={"img/logo.jpg"} />
                        </div>

                        <div>
                            <NavSuperAdmin />

                        </div>

                        <div>
                            <ConfigAndLogoutSuperAdmin />

                        </div>
                    </div>
                </section> */}


                <section className="panel_home_super_admin__section--content">
                    <h1>Contenido Principal</h1>
                    
                </section>


                <section className="panel_home_super_admin__section--analytics">

                    <div>
                        <AnalyticsCurrent dataAdmin={dataCurrentAnalytics} />
                    </div>

                    <div>
                        <CardSeguimientoInventario title="Seguimiento de inventario" data={dataInventario} />
                    </div>

                    <div>   
                        <NotificacionesSuperAdmin />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default PanelHomeSuperAdmin;
