import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { ContextLogin } from './context/context_login/context.login';
import Home from './routers/home/home';
import AuthRouters from './routers/auth/auth.routers';

import CardAdminData from './components/super_admin/card_admin_data/card_admin_data.component';
import NavSuperAdmin from './components/super_admin/nav_super_admin/nav_super_admin.component';
import ConfigAndLogoutSuperAdmin from './components/super_admin/config_and_logout/config_and_logout_super_admin.component';

import ProfileRouter from './routers/profile/profile.router';
import './App.scss';


const dataAdmin = {
  name: "Neyen Hernández",
  email: "neyenhernandez@gmail.com"
}

const object_data_descriptions = [
  {
    section_title: "Gestión de Usuarios",
    defaultValue: "Esta sección permite gestionar los usuarios del sistema, incluyendo la modificación, consulta y eliminación de usuarios.",
    update_user: "Modificar usuario",
    get_users: "Obtener lista de usuarios",
    delete_user: "Eliminar usuario"
  },
  {
    section_title: "Gestión de Productos",
    defaultValue: "Esta sección permite gestionar los productos del sistema, incluyendo la creación, modificación, visualización y eliminación de productos.",
    create_product: "Crear producto",
    get_products: "Ver productos disponibles",
    update_product: "Modificar producto",
    delete_product: "Eliminar producto"
  },
  {
    section_title: "Gestión de Ventas de Productos",
    defaultValue: "Esta sección permite gestionar las ventas de productos, incluyendo el registro de ventas, visualización y modificación de registros de ventas.",
    create_sell_product: "Registrar venta de producto",
    get_sell_products: "Ver ventas de productos",
    update_sell_product: "Modificar venta de producto",
    delete_sell_product: "Eliminar registro de venta"
  },
  {
    section_title: "Gestión de Categorías de Productos",
    defaultValue: "Esta sección permite gestionar las categorías de productos, facilitando la creación, visualización, modificación y eliminación de categorías.",
    create_categoryof_product: "Crear categoría de producto",
    get_categoryof_products: "Ver categorías de productos",
    update_categoryof_product: "Modificar categoría de producto",
    delete_categoryof_product: "Eliminar categoría de producto"
  },
  {
    section_title: "Gestión de Costos de Producción",
    defaultValue: "Esta sección permite gestionar los costos de producción, incluyendo el registro, visualización, modificación y eliminación de costos.",
    create_cost_production: "Registrar costo de producción",
    get_all_cost_productions: "Ver todos los costos de producción",
    update_cost_production: "Modificar costo de producción",
    delete_cost_production: "Eliminar costo de producción"
  },
  {
    section_title: "Gestión de Stock de Materia Prima",
    defaultValue: "Esta sección permite gestionar el stock de materia prima, incluyendo el registro, visualización, actualización y eliminación del stock.",
    create_stock_materia_prima: "Registrar stock de materia prima",
    get_stock_materia_prima: "Ver stock de materia prima",
    update_stock_materia_prima: "Actualizar stock de materia prima",
    delete_stock_materia_prima: "Eliminar stock de materia prima"
  },
  {
    section_title: "Gestión de Materiales de Producto",
    defaultValue: "Esta sección permite gestionar los materiales de los productos, incluyendo el registro, visualización, actualización y eliminación de materiales.",
    create_product_material: "Registrar material de producto",
    get_product_material: "Ver material de producto",
    update_product_material: "Actualizar material de producto",
    delete_product_material: "Eliminar material de producto"
  },
  {
    section_title: "Análisis de Ventas",
    defaultValue: "Esta sección permite realizar análisis de ventas, incluyendo la visualización de ventas totales por producto y análisis de tendencias.",
    get_sell_total_X_products: "Ver ventas totales por producto",
    get_total_sell_revenue: "Ver ingresos totales por ventas",
    trend_analysis: "Análisis de tendencias",
    get_trends_analytics_month: "Ver tendencias de ventas del mes"
  },
  {
    section_title: "Análisis de Costos",
    defaultValue: "Esta sección permite realizar análisis de costos, incluyendo el análisis de márgenes de beneficio.",
    profit_margin_analytics: "Análisis de margen de beneficio"
  }
];

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const { user_true } = useContext(ContextLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_true && !isAuthPage) {
      navigate('/login');
    }
  }, [user_true, isAuthPage, navigate]);


  return (
    <>
      {isAuthPage ? (
        <AuthRouters />
      ) : (
        <>

          <div className="nav__container">
                    
            <div className="nav__menu">
    
              <div className="nav__menu__data-user">
                <CardAdminData dataAdmin={dataAdmin} image={"img/logo.jpg"} />
              </div>
    
              <div className="nav__menu__nav">
                <NavSuperAdmin />
              </div>
    
              <div className="nav__menu__logout-login">
                <ConfigAndLogoutSuperAdmin />
              </div>
    
            </div>
            
          </div>

          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/profile" element={<ProfileRouter dataFunc={object_data_descriptions[0]}/>} />
          </Routes>

        </>
      )}
    </>
  );
};

export default App;
