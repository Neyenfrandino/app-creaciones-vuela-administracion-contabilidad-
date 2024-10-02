import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { ContextLogin } from './context/context_login/context.login';
import Home from './routers/home/home';
import AuthRouters from './routers/auth/auth.routers';

import CardAdminData from './components/super_admin/card_admin_data/card_admin_data.component';
import NavSuperAdmin from './components/super_admin/nav_super_admin/nav_super_admin.component';
import ConfigAndLogoutSuperAdmin from './components/super_admin/config_and_logout/config_and_logout_super_admin.component';

import ProfileSuperAdmin from './components/super_admin/profile_super_admin/profile_super_admin.component';

import './App.scss';


const dataAdmin = {
  name: "Neyen Hernández",
  email: "neyenhernandez@gmail.com"
}
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
            <Route path="/profile" element={<ProfileSuperAdmin/>} />
          </Routes>

        </>
      )}
    </>
  );
};

export default App;
