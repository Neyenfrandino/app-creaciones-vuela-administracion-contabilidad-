import { useState, useEffect } from 'react';
import React from 'react';
import Form from '../form/form.component';
import Select from '../select/select.component';

import { renderImgCompressed } from '../config_user/config_user.component';

import './handle_created.style.scss';

const HandleCreated = ({ valueVarObject, setIsNewData, handleClose, filterData, currentRoute }) => {
  
    const [ newState, setNewState ] = useState({});

    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        const found = Object.values(newState).some(value => 
            typeof value === "string" && value.includes('required')
        );
        console.log(found, 'hola mundo')
        if (!found) {      
            setIsNewData({
                [currentRoute]: newState,
                action: 'create'
            })

            setTimeout(() => {
                handleClose();
            }, 1500);
            
            return
        }else{
            setError(true)
        }

        setTimeout(() => {
            setError(false)
        }, 2000);
    } 

    const handleOnChange = async (e) => {
        const { name, value } = e.target;
        // console.log(name, value, 'hola mundo');
    
        if (name === 'image_url') {
            const file = e.target.files[0];
            if (file) {
                // Comprimir la imagen antes de convertirla a Base64
                const image = await renderImgCompressed(file, 500, 500, 0.7); // Calidad 0.7 ajustable
                // console.log(image, 'hola mundo');
                setNewState((prevState) => ({
                    ...prevState,
                    [name]: image // Guardar la imagen comprimida en el estado
                }));
            } 
        }else{
            // Actualización para otros campos que no son `image_url`
            setNewState((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };                

    console.log(newState, 'hola mundo')

    useEffect(() => {
        const initialNewState = Object.keys(valueVarObject).reduce((acc, item) => {
            acc[item] = valueVarObject[item][1];
            return acc;
        }, {});

        setNewState(initialNewState);
    }, [valueVarObject]);
    
    return (
        <form action="" className='handle__submit' onSubmit={handleSubmit}>
            {Object.keys(valueVarObject).map((item, index) => (
                <React.Fragment key={index}>
                    
                    {valueVarObject[item][3] && (valueVarObject[item][3] === 'select' || valueVarObject[item][3].includes('get')) ? (
                        <Select 
                            item={item} 
                            // value={valueVarObject[item][3]} 
                            // handleActionFunc={handleActionFunc} 
                            options={filterData} 
                            handleSelectValue={handleOnChange} 
                            className={`${error ? 'error' : ''}`}
                        />

                    ) : (
                        <Form 
                            label={valueVarObject[item][0] != 'Imagen'? valueVarObject[item][0] : null }
                            onChange={handleOnChange}
                            // inputId={item}
                            name={item}
                            type={valueVarObject[item][2]} 
                            className={`${error ? 'error' : ''}`}
                        />
                    )}
                </React.Fragment>
            ))}
            <div className='handle__button__container'>
                <button type="submit" className='handle__button'>enviar</button>
            </div>
        </form>
    )
}

export default HandleCreated;