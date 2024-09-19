
import NavRouters from "./routers/nav_routers/nav.routers";
import Home from "./routers/home/home";
import './App.scss';


const App = () => {
  return (
    <div className="App">
      <Home />
      <NavRouters />
      <h1>Creaciones Vuela</h1>
    </div>
  );
};

export default App;
