import { Link, useLocation } from 'react-router-dom';
import './nav_super_admin.style.scss';

import '@fortawesome/fontawesome-free/css/all.min.css';

const NavSuperAdmin = ({ routers }) => {

    const location = useLocation();

    return (
        <div className="nav_super_admin__container">
            <ul className="nav_super_admin__content__nav__ul">
                {routers.map((router, index) => {
                    let isPageTrueTo = location.pathname.split('/')[1] == (router.path.split('/')[1] );
                    return (
                        <li key={index} className={`nav_super_admin__content__nav__ul__li ${isPageTrueTo ? 'active_menu_admin' : ''}`} >
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