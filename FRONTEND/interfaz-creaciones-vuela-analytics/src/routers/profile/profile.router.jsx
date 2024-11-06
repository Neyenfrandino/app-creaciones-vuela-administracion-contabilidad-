import { useParams, useLocation } from "react-router-dom";
import GestionIntegral from '../../components/gestin_integral/gestion_integral.component';
import './profile.style.scss';

const DEFAULT_USER_PHOTO = "img/logo.jpg";

const ProfileRouter = ({ dataFunc }) => {
  const location = useLocation();
  const { route } = useParams();
  const ispage = location.pathname.split('/')[1];

  let isDateTrueUser = dataFunc.filter(item => item.route === route || item.route === ispage);
  delete isDateTrueUser[0].actions.create;

  return (
    <div className="profile__container">
      <GestionIntegral dataGestionStock={isDateTrueUser} />
    </div>
  );
};

export default ProfileRouter;