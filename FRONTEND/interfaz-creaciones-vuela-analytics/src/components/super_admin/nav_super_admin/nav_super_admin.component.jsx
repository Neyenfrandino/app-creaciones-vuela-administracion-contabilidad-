import { Link, useLocation } from 'react-router-dom';
import './nav_super_admin.style.scss';

import '@fortawesome/fontawesome-free/css/all.min.css';

let routers_nav_super_admin = [
    {
        path: '/',
        name: 'Panel Home',
        icon: 'fa fa-home',  // Icono de casa
    },
    {
        path: '/profile',
        name: 'Perfil Usuario',
        icon: 'fa fa-user',  // Icono de usuario
    },
    {
        path: '/estadisticas',
        name: 'Estadísticas',
        icon: 'fa fa-chart-line',  // Icono de gráfico de líneas
    },
    {
        path: '/super-admin-informes',
        name: 'Informes',
        icon: 'fa fa-file-alt',  // Icono de archivo o informe
    },
    {
        path: '/inventario',
        name: 'Inventario',
        icon: 'fa fa-boxes',  // Icono de cajas (inventario)
    }
];

const NavSuperAdmin = ({ routers }) => {
    
    const location = useLocation();

    return (
        <div className="nav_super_admin__container">
            <ul className="nav_super_admin__content__nav__ul">
                {routers_nav_super_admin.map((router, index) => {
                    return (
                        <li key={index} className={`nav_super_admin__content__nav__ul__li ${location.pathname === router.path ? 'active_menu_admin' : ''}`} >
                            <Link to={router.path} className="link">
                                <i className={router.icon}></i><span>{router.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        
        </div>    
    )
}

export default NavSuperAdmin;