import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContextQuery } from '../../context/contexts_query/contexts_query';
import Form from '../form/form.component';
import './register_user.style.scss';


const defaultFormFields = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
};

const RegisterUser = () => { 
    const { setkeyQuery } = useContext(ContextQuery);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [error, setError] = useState(false);
    const { email, password, name, confirmPassword } = formFields;
  
    const handleOnChange = (e) => {

        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const newValueUser = {
            'profile' : {...formFields},
            action: 'create'
        }

        if (formFields.password === formFields.confirmPassword && formFields.password.length >= 6 && formFields.email !== '') {
            setkeyQuery( newValueUser );
            setFormFields(defaultFormFields);
            // console.log(formFields);
        }else{
            setError(true);

            const timer = setTimeout(() => {
                setError(false);
                // setUserTrue('');
            }, 3000);
            
            // Limpieza del timeout cuando el componente se desmonte o cambie el estado
            return () => clearTimeout(timer);
        }
    }
  

    return (
        <div className='register_user__container'>
            <div className='register_user__haders'>
                <h1>Create User</h1>
            </div>

            <form action="" className={`register_user__form`} onSubmit={handleOnSubmit}>
                <Form 
                    label='Email' 
                    value={email} 
                    onChange={handleOnChange}
                    inputId='email'
                    name='email'
                    type='email'
                    className={error ? 'error' : ''}
                />

                <Form 
                    label='Name' 
                    value={name} 
                    onChange={handleOnChange}
                    inputId='name'
                    name='name'
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

                <Form 
                    label='Confirm Password'
                    value={confirmPassword} 
                    onChange={handleOnChange}
                    inputId='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    className={error ? 'error' : ''}
                />

                <button type="submit" className='register_user__button'>Create User</button>

                <div className='register_user__login'>
                    <p>Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
                </div>
            </form>
            

        </div>
    )
}

export default RegisterUser;
