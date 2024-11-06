// import { useContext, useEffect } from 'react';
// import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';

// import { ContextLogin } from './context/context_login/context.login';
// import { ContextQuery } from './context/contexts_query/contexts_query.jsx';
// import Home from './routers/home/home';
// import AuthRouters from './routers/auth/auth.routers';

// import CardAdminData from './components/super_admin/card_admin_data/card_admin_data.component';
// import NavSuperAdmin from './components/super_admin/nav_super_admin/nav_super_admin.component';
// import ConfigAndLogoutSuperAdmin from './components/super_admin/config_and_logout/config_and_logout_super_admin.component';

// import ProfileRouter from './routers/profile/profile.router';
// import AnalyticsRouter from './routers/analytics/analytics.router';
// import InventarioRouter from './routers/inventario/inventario.router';


// import data_query from '../src/data_query.json';
// import './App.scss';


// let routers_nav_super_admin = [
//   {
//       path: '/',
//       name: 'Panel Home',
//       icon: 'fa fa-home',  // Icono de casa
//   },
//   {
//       path: '/profile',
//       name: 'Perfil Usuario',
//       icon: 'fa fa-user',  // Icono de usuario
//   },
//   {
//       path: '/estadisticas',
//       name: 'Estadísticas',
//       icon: 'fa fa-chart-line',  // Icono de gráfico de líneas
//   },
//   {
//       path: '/super-admin-informes',
//       name: 'Informes',
//       icon: 'fa fa-file-alt',  // Icono de archivo o informe
//   },
//   {
//       path: '/inventario',
//       name: 'Inventario',
//       icon: 'fa fa-boxes',  // Icono de cajas (inventario)
//   }
// ];


// const App = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
//   const { user_true, logout } = useContext(ContextLogin);

//   const { setkeyQuery, dataUser_db, keyQuery, setDataUser_db } = useContext(ContextQuery);
//   const stored = sessionStorage.getItem('profile-get');
//   // const storedUserTrue = stored && JSON.parse(stored) && JSON.parse(stored).userData;

//   console.log(stored, 'storedUserTrue')
//   const ispage = location.pathname.split('/');

//   let isDateTrueUser = data_query.filter(item => ispage.includes(item.route));
//   // console.log(isDateTrueUser[0].route, 'isDateTrueUser');


//   useEffect(() => {
//     if (!user_true && !isAuthPage) {
//       setDataUser_db('')
//       navigate('/login');
//     }
//   }, [user_true, isAuthPage, navigate]);

//   const handleClick = () => logout();

//   useEffect(() => {
//     setkeyQuery({ [isDateTrueUser[0] ? isDateTrueUser[0].route : 'profile']: 'get' });
//   }, []);

//   return (
//     <>
//       {isAuthPage ? (
//         <AuthRouters />
//       ) : (
//         <>

//           <div className="nav__container">
                    
//             <div className="nav__menu">
    
//               <div className="nav__menu__data-user">
//                 <CardAdminData dataAdmin={storedUserTrue} image={"img/logo.jpg"} />
//               </div>
    
//               <div className="nav__menu__nav">
//                 <NavSuperAdmin routers={routers_nav_super_admin} />
//               </div>
    
//               <div className="nav__menu__logout-login">
//                 <ConfigAndLogoutSuperAdmin handleClick={handleClick} />
//               </div>
    
//             </div>
            
//           </div>
          
//           <Routes>
//             <Route index element={<Home />} />
//             <Route path="/profile" element={<ProfileRouter dataFunc={data_query} />} />
//             {/* <Route path="/estadisticas/*" element={<AnalyticsRouter dataAnalytics={data_query} />} /> */}
//             <Route path="/inventario/*" element={<InventarioRouter dataInventario={data_query} />} />     
//           </Routes>

//         </>
//       )}
//     </>
//   );
// };

// export default App;


import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ContextLogin } from './context/context_login/context.login';
import { ContextQuery } from './context/contexts_query/contexts_query.jsx';
import Home from './routers/home/home';
import AuthRouters from './routers/auth/auth.routers';
import CardAdminData from './components/super_admin/card_admin_data/card_admin_data.component';
import NavSuperAdmin from './components/super_admin/nav_super_admin/nav_super_admin.component';
import ConfigAndLogoutSuperAdmin from './components/super_admin/config_and_logout/config_and_logout_super_admin.component';
import ProfileRouter from './routers/profile/profile.router';
import InventarioRouter from './routers/inventario/inventario.router';

import data_query from '../src/data_query.json';
import './App.scss';

const routers_nav_super_admin = [
  {
    path: '/',
    name: 'Panel Home',
    icon: 'fa fa-home',
  },
  {
    path: '/profile',
    name: 'Perfil Usuario',
    icon: 'fa fa-user',
  },
  {
    path: '/estadisticas',
    name: 'Estadísticas',
    icon: 'fa fa-chart-line',
  },
  {
    path: '/super-admin-informes',
    name: 'Informes',
    icon: 'fa fa-file-alt',
  },
  {
    path: '/inventario',
    name: 'Inventario',
    icon: 'fa fa-boxes',
  }
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user_true, logout } = useContext(ContextLogin);
  const { setkeyQuery, setDataUser_db } = useContext(ContextQuery);
  
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const stored = sessionStorage.getItem('profile-get');
  const storedUserTrue = stored ? JSON.parse(stored)?.userData : null;
  
  const pathSegments = location.pathname.split('/');
  const currentRoute = data_query.find(item => pathSegments.includes(item.route));

  // Efecto para manejar la autenticación
  useEffect(() => {
    if (!user_true && !isAuthPage) {
      setDataUser_db('');
      navigate('/login');
    }
  }, [user_true, isAuthPage]);

  // Efecto para la carga inicial de datos
  useEffect(() => {
    // if (!isAuthPage && !initialDataFetched) {
      const routeToFetch = currentRoute?.route || 'profile';
      setkeyQuery({ [routeToFetch]: 'get' });
      setInitialDataFetched(true);
    // }
  }, [isAuthPage, initialDataFetched, ]);

  const handleClick = () => {
    setInitialDataFetched(false);
    logout();
  };

  if (isAuthPage) {
    return <AuthRouters />;
  }

  return (
    <>
      <div className="nav__container">
        <div className="nav__menu">
          <div className="nav__menu__data-user">
            <CardAdminData 
              dataAdmin={storedUserTrue} 
              image={"img/logo.jpg"} 
            />
          </div>

          <div className="nav__menu__nav">
            <NavSuperAdmin routers={routers_nav_super_admin} />
          </div>

          <div className="nav__menu__logout-login">
            <ConfigAndLogoutSuperAdmin handleClick={handleClick} />
          </div>
        </div>
      </div>
      
      <Routes>
        <Route index element={<Home />} />
        <Route 
          path="/profile" 
          element={<ProfileRouter dataFunc={data_query} />} 
        />
        <Route 
          path="/inventario/*" 
          element={<InventarioRouter dataInventario={data_query} />} 
        />
      </Routes>
    </>
  );
};

export default App;