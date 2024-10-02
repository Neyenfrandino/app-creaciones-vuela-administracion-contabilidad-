import { createContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import login from '../../utlis/login/login';


export const ContextLogin = createContext({
    user_true: '',
    setUserTrue: () => {},
});

export const ContextLoginProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user_form, set_user_form] = useState('');
    const [user_true, setUserTrue] = useState(() => {
        const storedUser = sessionStorage.getItem('accessTrue');
        return storedUser ? JSON.parse(storedUser) : null; // Devuelve el objeto o null si no existe
    });

    useEffect(() => {
        if (user_form['login-user']) {
            let formData = new FormData();
                formData.append('username', user_form.email);
                formData.append('password', user_form.password);

            if (user_form.password && user_form.email){
                let response = login(formData);

                response.then((data) => {
                    if (data['access_token'] && data['token_type']) {
                   
                        const accessTrue = {
                            access_token: data['access_token'],
                            token_type: data['token_type'],
                            user_id: data['user_id']
                        }
                        sessionStorage.setItem('accessTrue', JSON.stringify(accessTrue));
                        setUserTrue(data);
                        navigate('/');
                        return
                    }else if (!data.ok){
                        console.log(data);
                        setUserTrue('error');
                    }
                    
                })
            }
        } 

    }, [user_form]);

    
    const values = { user_form, set_user_form, user_true, setUserTrue };

    return (
        <ContextLogin.Provider value={values}>
            {children}
        </ContextLogin.Provider>
    )
}
