import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { ContextLogin } from './context/context_login/context.login';
import { ContextQuery } from './context/contexts_query/contexts_query.jsx';
import Home from './routers/home/home';
import AuthRouters from './routers/auth/auth.routers';

import CardAdminData from './components/super_admin/card_admin_data/card_admin_data.component';
import NavSuperAdmin from './components/super_admin/nav_super_admin/nav_super_admin.component';
import ConfigAndLogoutSuperAdmin from './components/super_admin/config_and_logout/config_and_logout_super_admin.component';

import ProfileRouter from './routers/profile/profile.router';
import AnalyticsRouter from './routers/analytics/analytics.router';
import InventarioRouter from './routers/inventario/inventario.router';

import data_query from '../src/data_query.json';
import './App.scss';



const App = () => {
  console.log(data_query);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const { user_true } = useContext(ContextLogin);

  const { setkeyQuery, dataUser_db, keyQuery } = useContext(ContextQuery);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_true && !isAuthPage) {
      navigate('/login');
    }
  }, [user_true, isAuthPage, navigate]);

  const handleClick = () => {
    // console.log("handleClick");
    setkeyQuery('logout');
  }
  useEffect(() => {
    setkeyQuery('get_users');
  }, [keyQuery]);

  return (
    <>
      {isAuthPage ? (
        <AuthRouters />
      ) : (
        <>

          <div className="nav__container">
                    
            <div className="nav__menu">
    
              <div className="nav__menu__data-user">
                <CardAdminData dataAdmin={dataUser_db} image={"img/logo.jpg"} />
              </div>
    
              <div className="nav__menu__nav">
                <NavSuperAdmin />
              </div>
    
              <div className="nav__menu__logout-login">
                <ConfigAndLogoutSuperAdmin handleClick={handleClick} />
              </div>
    
            </div>
            
          </div>

          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/profile" element={<ProfileRouter dataFunc={data_query[0]}/>} />
            <Route path="/estadisticas/*" element={<AnalyticsRouter dataAnalytics={data_query} />} />
            <Route path="/inventario/*" element={<InventarioRouter dataInventario={data_query} />} />
          </Routes>

        </>
      )}
    </>
  );
};

export default App;
