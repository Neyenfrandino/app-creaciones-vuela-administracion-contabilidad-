import { useState, useEffect } from 'react';
import React from 'react';
import Form from '../form/form.component';
import Select from '../select/select.component';

import './handle_created.style.scss';

const HandleCreated = ({ valueVarObject, handleStateCreated, openConfirmation, handleClose, handleActionFunc, filterData}) => {
    console.log(valueVarObject)

    const [ newState, setNewState ] = useState({});

    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        const found = Object.values(newState).some(value => 
            typeof value === "string" && value.includes('required')
        );

        if (!found) {      
            handleStateCreated(newState, 'create');
            openConfirmation();

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

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)

        setNewState({
            ...newState,
            [name]: value
        })
    }

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
                        <Select item={item} value={valueVarObject[item][3]} handleActionFunc={handleActionFunc} options={filterData} handleSelectValue={handleOnChange} />
                    ) : (
                        <Form 
                            label={valueVarObject[item][0]}
                            onChange={handleOnChange}
                            // inputId={item}
                            name={item}
                            type={valueVarObject[item][2]} 
                            className={`form__input ${error ? 'error' : ''}`}
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