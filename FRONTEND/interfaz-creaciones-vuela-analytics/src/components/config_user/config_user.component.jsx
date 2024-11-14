import { useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import './config_user.style.scss';

export const renderImgCompressed = async (file, maxWidth, maxHeight, quality) => {
    if (file) {
        const compressImage = (file, maxWidth, maxHeight, quality) => {
            return new Promise((resolve, reject) => {
                const img = document.createElement('img');
                const reader = new FileReader();

                reader.readAsDataURL(file); // Leer el archivo como Base64
                reader.onload = (event) => {
                    img.src = event.target.result; // Asignar la imagen resultante
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        let width = img.width;
                        let height = img.height;

                        // Mantener la proporción de aspecto
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;

                        // Dibujar la imagen redimensionada en el canvas
                        ctx.drawImage(img, 0, 0, width, height);

                        // Convertir el canvas a Base64 comprimido, usando JPEG y ajustando la calidad
                        const compressedBase64 = canvas.toDataURL('image/jpeg', quality); // Aquí aplicamos la calidad
                        resolve(compressedBase64);
                    };
                };
                reader.onerror = (error) => reject(error);
            });
        };

        // Llamada a compressImage y retorno del resultado
        return await compressImage(file, maxWidth, maxHeight, quality);
    }

    return null; // Retorno nulo si no hay archivo
};



const ConfigUser = ({ usuario, typeFunc, usuarioA, onStateChange }) => {

    const location = useLocation();
    
    const USER_ACTION_TYPES = {
        SET_VALUE: 'SET_VALUE',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case USER_ACTION_TYPES.SET_VALUE:
                const newState = { ...usuario, [action.field]: action.payload }; // Cambiar 'usuario' a 'state'
                onStateChange(newState, typeFunc); // Enviar el estado actualizado al componente padre
                return newState;
            default:
                throw new Error(`Action ${action.type} no encontrada`);
        }
    };

    const [state, dispatch] = useReducer(reducer, usuario);

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        // Verificar si el evento tiene un target con nombre
        if (name) {
            dispatch({ type: USER_ACTION_TYPES.SET_VALUE, field: name, payload: value });
        }
    };

    if (!usuario) {
        return <p>Usuario no disponible</p>; // Manejo de error o mostrar algo por defecto
    }

    const handleImageChange = async (e) => {
        console.log('File input changed:', e);
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file)
     
        if (file) {
            try {
                // Comprimir la imagen antes de convertirla a Base64 (máximo 500x500 px) y reducir la calidad
                const asd = await renderImgCompressed(file, 500, 500, 0.7); // Calidad 0.7 (ajustable)
                
                // Guardar la imagen comprimida en el estado usando dispatch
                dispatch({
                    type: USER_ACTION_TYPES.SET_VALUE,
                    field: 'photo',
                    payload: asd, // Guardar la imagen comprimida en el estado
                });

            } catch (error) {
                console.error('Error al comprimir la imagen:', error);
            }
        }
    };

    return (
        <div className='profile__content--config--user'>

            
            <div className="profile__content--image">
                
                <img 
                    src={state ? state.photo : usuario.photo || usuarioA.photo}
                    alt="image-profile" 
                    className={`${location.pathname !== '/profile' ? '' : 'profile-image'}`}
                    style={location.pathname !== '/profile' ? { opacity: '0' } : {}}
                />
                
                {
                    typeFunc == 'update' ?
                    <label 
                        htmlFor="file-upload" 
                        className={`${location.pathname !== '/profile' ? '' : 'button-image'}`} 
                        style={location.pathname !== '/profile' ? { opacity: 0 } : {}}>
                            <input
                                type="file"
                                name="file-upload"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <span className="button-icon">+</span>
                    </label>:null

                }

            </div>

            <div className="profile__content--data">
                {Object.keys(usuario).map((key) => {
                    if (key === 'photo' || key === 'password') {
                        return null; // Saltar la imagen y el password
                    }

                    return (
                        <div key={key} className="profile__content--data__item">
                            {typeFunc === 'update' ? (
                                <form className="profile__content--data__item--form">
                                    <label htmlFor={key}>{key}</label>
                                    <input
                                        type="text"
                                        name={key}
                                        value={state ? state[key] : usuario[key]} // Usar 'usuario[key]' como valor por defecto
                                        id={key}
                                        onChange={handleInputChange}
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
