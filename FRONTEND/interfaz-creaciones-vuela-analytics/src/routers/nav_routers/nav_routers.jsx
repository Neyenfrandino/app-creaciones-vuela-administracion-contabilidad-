import { useContext, useState, useEffect } from "react";

import Nav from "../../components/nav/nav.component";
import ShoppingCartAndLoginBar from "../../components/shopping_cart_and_login_bar/shopping_cart_and_login_bar.component";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './nav_routers.scss';

const routers = {
    "Home": "/",
    "Productos": "/shop-products",
    "Temporada": "/products-temporada",
    "Bolsos": "/Bags",
    "Accesorios": "/Accessories",
    "Niños": "/kids",
    "Tarjeta regalo": "/cards-gift",
    "Imágenes": "/lookbook",
};

const NavRouters = () => {
    const [menuDropdown, setMenuDropdown] = useState(sessionStorage.getItem('menuDropdown') === 'true');
    const [isclassnameTrue, setIsclassnameTrue] = useState(sessionStorage.getItem('isclassnameTrue') === 'true');

    const habilitarMenuDropdown = () => {
        if (menuDropdown) {
            setIsclassnameTrue(false);
            sessionStorage.setItem('isclassnameTrue', 'false');

            setTimeout(() => {
                setMenuDropdown(false); // Cambia a false después de la animación
                sessionStorage.setItem('menuDropdown', 'false');
            }, 500);
        } else {
            setIsclassnameTrue(true);
            sessionStorage.setItem('isclassnameTrue', 'true');
            setMenuDropdown(true);
            sessionStorage.setItem('menuDropdown', 'true');
        }
    };


    return (
        <>  
            <div className="nav-container">
                <div className={isclassnameTrue ? 'nav-container-dropdown-on' : 'nav-container-dropdown-off'}>
                    {menuDropdown && (
                        <>
                            <ShoppingCartAndLoginBar />
                            <Nav routers={routers} logo={'img/logo.jpg'} />
                        </>
                    )}
                </div>
                <div className="menu-dropdown" onClick={habilitarMenuDropdown} title="Menú">
                    <FontAwesomeIcon icon={isclassnameTrue ? faChevronUp : faChevronDown} />
                </div>
            </div>
        </>
    );
};

export default NavRouters;
