import { createContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import create_user from '../../utlis/user/create_user';

export const ContextQuery = createContext({
    userContent: '',
    setUserContent: () => {},
});

export const ContextQueryProvider = ({ children }) => {
    const [userContent, setUserContent] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        if (userContent['register-user'] && userContent.password && userContent.confirmPassword && userContent.email) {
    
            const fetchData = async () => {
                try {
                    const response = await create_user(userContent);

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
    }, [userContent]);
    
    const values= { userContent, setUserContent };
    return (
        <ContextQuery.Provider value={values}>
            {children}
        </ContextQuery.Provider>
    )
}