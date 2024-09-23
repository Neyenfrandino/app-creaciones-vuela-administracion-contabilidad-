import { createContext, useState, useEffect} from 'react';

import login from '../../utlis/login/login';


export const ContextLogin = createContext({
    user_true: '',
    setUserTrue: () => {},
});

export const ContextLoginProvider = ({ children }) => {

    const [user_form, set_user_form] = useState('');
    const [user_true, setUserTrue] = useState('');

    useEffect(() => {
        if (user_form['login-user']) {
            let formData = new FormData();
                formData.append('username', user_form.email);
                formData.append('password', user_form.password);

            if (user_form.password && user_form.email){
                let response = login(formData);
                response.then((data) => {
                    if (data['access_token'] && data['token_type']) {
                        // localStorage.setItem('access_token', data['access_token']);
                        // localStorage.setItem('token_type', data['token_type']);
                        setUserTrue(data);
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

    console.log(user_true, 'aaaaaaaa');
    return (
        <ContextLogin.Provider value={values}>
            {children}
        </ContextLogin.Provider>
    )
}
