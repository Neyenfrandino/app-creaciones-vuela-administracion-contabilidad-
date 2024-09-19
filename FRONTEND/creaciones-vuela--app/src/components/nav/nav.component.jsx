import {Link} from "react-router-dom";
import "./nav.style.scss";

const Nav = ({routers, logo}) => {

    const navRouters = () => {
        return (
            <div className="nav-routers__container">
                <div className="nav-logo">
                    <Link to="/">
                        <img src={`${logo}`} alt="logo-nav" />
                    </Link>
                </div>

                <div className="nav-routers">
                    <ul>
                        {Object.keys(routers).map((router, index) => {
                            return (
                                <li key={index}>
                                    <Link to={routers[router]}>
                                        {router}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    };

  return (
    <div className="nav">
        {navRouters(routers)}
    </div>
  );
};

export default Nav;