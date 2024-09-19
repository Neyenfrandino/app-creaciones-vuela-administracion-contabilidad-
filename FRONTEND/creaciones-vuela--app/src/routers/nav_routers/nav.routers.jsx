import Nav from "../../components/nav/nav.component";

const routers = {
    "Home": "/",
    "Productos": "/products",
    "Materiales": "/materials",
    "Stocks": "/stocks",
    "Costs Production": "/costs_production",
    "Users": "/users",
};

const NavRouters = () => {


  return (
    <>
        <Nav routers={routers} logo="\img\logo.jpg" />
    </>
  );
};

export default NavRouters;