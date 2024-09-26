import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { ContextLogin } from './context/context_login/context.login';
import Home from './routers/home/home';
import SuperUserRouters from './routers/super_user/super_user.routers';
import AuthRouters from './routers/auth/auth.routers';
import NavRouters from './routers/nav_routers/nav_routers';

import './App.scss';

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
          <NavRouters />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/super-user" element={<SuperUserRouters />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
