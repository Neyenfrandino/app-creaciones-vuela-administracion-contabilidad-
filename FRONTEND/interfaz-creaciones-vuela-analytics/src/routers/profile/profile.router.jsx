import React, { useContext, useEffect, useState, useCallback, act } from 'react';
import { ContextQuery } from '../../context/contexts_query/contexts_query.jsx';
import ConfigUser from '../../components/config_user/config_user.component';
import FuncConfigUser from '../../components/func_config_user/func_config_user.component';
import CheckUpdateAction from '../../components/check_update_action/check_update_action.component.jsx';
import './profile.style.scss';

const DEFAULT_USER_PHOTO = "img/logo.jpg";

const ProfileRouter = ({ dataFunc }) => {
  const { setkeyQuery, dataUser_db, setDataUser_db } = useContext(ContextQuery);
  const [actionFunc, setActionFunc] = useState('get_users');
  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    console.log(actionFunc);
    if(actionFunc == 'get_users'){
      setkeyQuery(actionFunc);
    }   

    if (actionFunc === 'delete_user') {
      setIsConfirmationOpen(true);
    }
  }, [actionFunc]);

  const handleActionFunc = useCallback((key) => {
    setActionFunc(key);
  }, []);

  const handleUserStateChange = useCallback((newState, typeFunc) => {
    setUpdatedUserData({ newState, typeFunc });
  }, []);

  const handleSaveChanges = useCallback((option) => {
    if (option === 'Si') {    
      if (actionFunc === 'delete_user') {
        console.log('Confirmando eliminación de usuario');
        // Implementar lógica para eliminar el usuario
        setkeyQuery('delete_user');
      } else if (updatedUserData) {
        console.log('Guardando datos:', updatedUserData);
        setkeyQuery(updatedUserData);
        setDataUser_db(prevData => ({
          ...prevData,
          ...updatedUserData.newState
        }));
      }
    }
    setIsConfirmationOpen(false);
    setActionFunc('get_users');
  }, [actionFunc, updatedUserData, setkeyQuery, setDataUser_db]);

  const openConfirmation = useCallback(() => {
    setIsConfirmationOpen(true);
  }, []);


  return (
    <div className="profile__container">
      <div className="profile__content">

        <header className='profile__header'>
          <h1>Configuración de perfil</h1>
        </header>

        <div className='profile__content--bento'>
          <ConfigUser
            usuario={dataUser_db}
            typeFunc={actionFunc}
            usuarioA={{ photo: DEFAULT_USER_PHOTO }}
            onStateChange={handleUserStateChange}
          />

          <FuncConfigUser dataFunc={dataFunc} setkeyQuery={handleActionFunc}>
            <button 
              onClick={openConfirmation} 
              className={`save_changes${actionFunc !== 'update_user' ? '--disabled' : ''}`}
              disabled={actionFunc !== 'update_user'}
            >
              {actionFunc === 'update_user' ? 'Guardar cambios' : 'Cambios deshabilitados'}           
            </button>
          </FuncConfigUser>

        </div>
      </div>

      {isConfirmationOpen && (
        <div className='profile__container--check'>
          <CheckUpdateAction handleOnClick={handleSaveChanges} />
        </div>
      )}
    </div>
  );
};

export default ProfileRouter;