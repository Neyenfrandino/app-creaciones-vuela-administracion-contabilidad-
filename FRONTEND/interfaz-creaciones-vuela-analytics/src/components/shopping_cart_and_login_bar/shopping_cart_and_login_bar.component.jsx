import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa'; // Importa los íconos que necesites

import "./shopping_cart_and_login_bar.style.scss";

const ShoppingCartAndLoginBar = ({ children }) => {
    const [cartDropdown, setCartDropdown] = useState({
        cartDropdown: false,
        className: "dropdown-content",
    });
    
    return (
        <div className="shopping_cart_and_login_bar__container" >

            <div>
                {children}
            </div>
            
            <div className='shopping_cart_and_login_bar__cart' onClick={() => setCartDropdown({cartDropdown: !cartDropdown.cartDropdown})}>
                <FaShoppingCart /> 
                <span>0</span>

                {
                    cartDropdown.cartDropdown ?               
                        <div className={`shopping_cart_and_login_bar__cart-items ${cartDropdown.className}`}>
                        <h1>Shopping Cart</h1>
                        <h1>Shopping Cart</h1>
                        <h1>Shopping Cart</h1>
                        <h1>Shopping Cart</h1>
                        <h1>Shopping Cart</h1>
                    </div>  
                    : null
                }
 
            </div>

            <div className='shopping_cart_and_login_bar__user'>
                <Link to="/super-user" className="link">
                    <div className='img'>
                        <img className='img-user' src='img/logo.jpg' alt="user" /> 
                    </div>

                    <span>Neyen</span>
                </Link>

            </div>
            

        </div>
    );
};

export default ShoppingCartAndLoginBar;