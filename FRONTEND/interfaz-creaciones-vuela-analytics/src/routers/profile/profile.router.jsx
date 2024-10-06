import { useContext , useEffect, useState} from 'react';
import { ContextQuery } from '../../context/contexts_query/contexts_query.jsx';

import ConfigUser from '../../components/config_user/config_user.component';
import FuncConfigUser from '../../components/func_config_user/func_config_user.component';
import './profile.style.scss';

const usuario  = {
    name: "Neyen Hernández",
    lastname: "Hernández",
    username: "neyenhernandez",
    email: "neyenhernandez@gmail.com",
    password: "123456789",
    phone: "123456789",
    address: "123456789",
    city: "123456789",
    photo: "img/logo.jpg"

}

const ProfileRouter = ({dataFunc}) => {
    const { setkeyQuery, dataUser_db } = useContext(ContextQuery);
    const [actionFunc, setActionFunc] = useState('get_users');

    const handleActionFunc = (key) => {
        setActionFunc(key);
    }

    useEffect(() => {
        setkeyQuery(actionFunc);
    }, [ actionFunc ]);

    console.log(dataUser_db, 'dataUser_db');

    return (
        <div className="profile__container">
            <div className="profile__content">
                <div className='profile__header'>
                    <h1>Configuración de perfil</h1>
                </div>

                <div className='profile__content--bento'>

                    <ConfigUser usuario={dataUser_db} typeFunc={actionFunc} />

                    <FuncConfigUser dataFunc={dataFunc} setkeyQuery={handleActionFunc} />

                </div>
            </div>

        </div>
    );
}   

export default ProfileRouter;