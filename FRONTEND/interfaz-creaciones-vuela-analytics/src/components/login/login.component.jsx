import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContextLogin } from '../../context/context_login/context.login';
import Form from '../form/form.component';
import './login.style.scss';


const defaultFormFields = {
    email: "",
    password: "",
};

const Login = () => { 
    const { set_user_form, user_true, setUserTrue } = useContext(ContextLogin);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [error, setError] = useState(false);
    const { email, password } = formFields;
  
    const handleOnChange = (e) => {

        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        formFields['login-user'] = true;
        set_user_form(formFields);
        
        setFormFields(defaultFormFields);
    }

    useEffect(() => {
        if (user_true === 'error') {
            setError(true);
    
            const timer = setTimeout(() => {
                setError(false);
                setUserTrue('');
            }, 3000);
            
            // Limpieza del timeout cuando el componente se desmonte o cambie el estado
            return () => clearTimeout(timer);
        }
    }, [user_true]);

    return (
        <div className='login__container'>
            <div className='login__haders'>
                <h1>Inicio de Sesión</h1>
            </div>

            <form action="" className={`login__form`} onSubmit={handleOnSubmit}>
                <Form 
                    label='Email' 
                    value={email} 
                    onChange={handleOnChange}
                    inputId='email'
                    name='email'
                    type='text'
                    className={error ? 'error' : ''}
                />

                <Form 
                    label='Password' 
                    value={password} 
                    onChange={handleOnChange}
                    inputId='password'
                    name='password'
                    type='password'
                    className={error ? 'error' : ''}
                />

                <button type="submit" className='login__button'>iniciar sesión</button>

                <div className='login__register'>
                    <p>No tienes cuenta? <Link to="/register">Registrate</Link></p>
                </div>
            </form>
            

        </div>
    )
}

export default Login;
