import { useEffect } from "react";

import './select.style.scss';
const Select = ({value, handleActionFunc, options, handleSelectValue }) => {

    useEffect(() => {
        if (value === 'get_products') {
            handleActionFunc(value);
        }
    },[value, handleActionFunc])

    if(!options) return null;
    
   
    return (
        <div className='select__container'>
            <select 
                // id={inputId} 
                name={options.key} 
                // type={type} 
                // className={className}
                onChange={handleSelectValue} 
                
                defaultValue={''}
            >
                <option value="" disabled>Selecciona una opción</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}   

export default Select;