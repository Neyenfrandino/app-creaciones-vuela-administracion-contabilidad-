import ShoppingCartAndLoginBar from "../../components/shopping_cart_and_login_bar/shopping_cart_and_login_bar.component";
import "./home.style.scss";
const home = () => {
    return (
        <>
            <div className="shopping_cart_and_login_bar">
                <ShoppingCartAndLoginBar />
            </div>
        </>
    );
};

export default home;