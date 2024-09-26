import { Link } from "react-router-dom";
import "./nav.style.scss";

const Nav = ({ routers, logo, navRef }) => {
  const navRouters = () => {
    return (
      <div className="nav-routers__container">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Logo de la página" />
          </Link>
        </div>

        <div className="nav-routers">
          <ul>
            {Object.keys(routers).map((router) => {
              return (
                <li key={router}>
                  <Link to={routers[router]}>{router}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="nav" ref={navRef}>
      {navRouters()}
    </div>
  );
};

export default Nav;
