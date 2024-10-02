import { createContext, useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextLogin } from '../context_login/context.login';

import create_user from '../../utlis/user/create_user';
import get_user from '../../utlis/user/get_user';

export const ContextQuery = createContext({
    keyQuery: '',
    setkeyQuery: () => {},
    dataUser_db: '',
    setDataUser_db: () => {},
});

export const ContextQueryProvider = ({ children }) => {
    const { user_true } = useContext(ContextLogin);
    const [keyQuery, setkeyQuery] = useState('');

    const [dataUser_db, setDataUser_db] = useState(() => {
        const storedUser = sessionStorage.getItem(keyQuery);
        return storedUser ? JSON.parse(storedUser) : null; // Devuelve el objeto o null si no existe
    });

    console.log(dataUser_db, 'dataUser_db');

    const navigate = useNavigate();

    useEffect(() => {
        if (keyQuery['register-user'] && keyQuery.password && keyQuery.confirmPassword && keyQuery.email) {
    
            const fetchData = async () => {
                try {
                    const response = await create_user(keyQuery);

                    if (!response) {
                        console.log(response);
                        return
                    } 
                    
                    navigate('/login');
                    
                } catch (error) {
                    console.error('Error creating user:', error);
                }
            };
            fetchData();
        }
    }, [keyQuery]);

    
    useEffect(() => {
        
        if (keyQuery == 'get_users' && dataUser_db == null) {
            
            if (user_true['access_token'] && user_true['token_type'] && user_true['user_id']) {
                console.log(keyQuery);
                    const user_data = {
                        token: user_true['access_token'],
                        token_type: user_true['token_type'],
                        user_id: user_true['user_id']
                    }
                    
                    const fetchData = async () => {
                        try {
                            const response = await get_user(user_data);

                            if (!response) {
                                console.log(response);
                                return
                            } 
                            
                            // navigate('/login');
                            setDataUser_db(response);
                            sessionStorage.setItem(`${keyQuery}`, JSON.stringify(response)); 
                            
                        } catch (error) {
                            console.error('Error creating user:', error);
                        }
                    };
                    fetchData();
                }

        }
   
    }, [keyQuery]);

    


    const values= { keyQuery, setkeyQuery, dataUser_db, setDataUser_db };
    return (
        <ContextQuery.Provider value={values}>
            {children}
        </ContextQuery.Provider>
    )
}