import { useReducer } from 'react';
import './config_user.style.scss';

const ConfigUser = ({ usuario, typeFunc }) => {

    const USER_ACTION_TYPES = {
        SET_VALUE: 'SET_VALUE',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case USER_ACTION_TYPES.SET_VALUE:
                return { ...state, [action.field]: action.payload }; // Actualiza dinámicamente el campo
            default:
                throw new Error(`Action ${action.type} no encontrada`);
        }
    };

    const [state, dispatch] = useReducer(reducer, usuario);

    // Maneja el cambio en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: USER_ACTION_TYPES.SET_VALUE, field: name, payload: value });
    };

    

    return (
        <div className='profile__content--config--user'>
            <div className="profile__content--title">
                <h4>Configuración de usuario</h4>
            </div>

            <div className="profile__content--image">
                {/* <input className='button-image' type="file" name="photo" id="photo" onChange={handleInputChange}  /> */}

                <img src={usuario.photo} alt="image-profile" />
            </div>

            <div className="profile__content--data">
                {Object.keys(usuario).map((key) => {
                    console.log(key, 'key');
                    if (key === 'photo' || key === 'password') {
                        return null; // Saltar la imagen
                    }

                    return (
                        <div key={key} className="profile__content--data__item">
                            {typeFunc === 'update_user' ? (
                                <form className="profile__content--data__item--form">
                                    <label htmlFor={key}>{key}</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={state[key]}
                                        onChange={handleInputChange}
                                        id={key}
                                    />
                                </form>
                            ) : (
                                <span>
                                    <strong style={{ textTransform: 'uppercase' }}>{key}</strong>: {usuario[key]}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ConfigUser;
