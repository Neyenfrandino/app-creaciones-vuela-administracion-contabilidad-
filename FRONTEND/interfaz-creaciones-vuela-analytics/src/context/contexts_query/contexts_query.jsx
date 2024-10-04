import { createContext, useState, useEffect, useContext, useReducer } from 'react';
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

export const USER_ACCION_TYPES = {
    SET_KEY_QUERY: 'SET_KEY_QUERY',
    SET_DATA_USER_DB: 'SET_DATA_USER_DB',
};

const reducer = (state, action) => {
    switch (action.type) {

        case USER_ACCION_TYPES.SET_KEY_QUERY:
            // console.log(action.type, 'action');
            return { ...state, keyQuery: action.payload };
        case USER_ACCION_TYPES.SET_DATA_USER_DB:
            // console.log(action.type, 'action');
            return { ...state, dataUser_db: action.payload };
        default:
            throw new Error (`Action ${action.type} no encontrada`);
    }
};

const initialState = {
    keyQuery: '',
    dataUser_db: '',
};

export const ContextQueryProvider = ({ children }) => {

    const { user_true } = useContext(ContextLogin);

    const [state, dispatch] = useReducer(reducer, initialState);

    const { keyQuery, dataUser_db } = state;

    const setkeyQuery = (payload) => {dispatch({ type: USER_ACCION_TYPES.SET_KEY_QUERY, payload: payload })};

    // console.log(keyQuery, 'state');

    // const [keyQuery, setkeyQuery] = useState('');

 /*    const [dataUser_db, setDataUser_db] = useState(() => {
        const storedUser = sessionStorage.getItem(keyQuery);
        return storedUser ? JSON.parse(storedUser) : null; // Devuelve el objeto o null si no existe
    }); */



    // console.log(keyQuery, 'keyQuery');
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (keyQuery['register-user'] && keyQuery.password && keyQuery.confirmPassword && keyQuery.email) {
    
    //         const fetchData = async () => {
    //             try {
    //                 const response = await create_user(keyQuery);

    //                 if (!response) {
    //                     console.log(response);
    //                     return
    //                 } 
                    
    //                 navigate('/login');
                    
    //             } catch (error) {
    //                 console.error('Error creating user:', error);
    //             }
    //         };
    //         fetchData();
    //     }
    // }, [keyQuery]);

    
    // useEffect(() => {
        
    //     if (keyQuery == 'get_users' && dataUser_db == null) {
            
    //         if (user_true['access_token'] && user_true['token_type'] && user_true['user_id']) {
    //             console.log(keyQuery);
    //                 const user_data = {
    //                     token: user_true['access_token'],
    //                     token_type: user_true['token_type'],
    //                     user_id: user_true['user_id']
    //                 }
                    
    //                 const fetchData = async () => {
    //                     try {
    //                         const response = await get_user(user_data);

    //                         if (!response) {
    //                             console.log(response);
    //                             return
    //                         } 
                            
    //                         // navigate('/login');
    //                         setDataUser_db(response);
    //                         sessionStorage.setItem(`${keyQuery}`, JSON.stringify(response)); 
                            
    //                     } catch (error) {
    //                         console.error('Error creating user:', error);
    //                     }
    //                 };
    //                 fetchData();
    //             }

    //     }
   
    // }, [keyQuery]);

    


    const values= { keyQuery, setkeyQuery, /* dataUser_db, setDataUser_db */ };
    return (
        <ContextQuery.Provider value={values}>
            {children}
        </ContextQuery.Provider>
    )
}