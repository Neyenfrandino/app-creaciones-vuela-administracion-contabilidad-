import { useEffect } from "react";

import './select.style.scss';
const Select = ({ options, handleSelectValue, item, className }) => {

    if(!options) return null;
    
   
    return (
        <div className='select__container'>
            <select 
                name={item}
                onChange={handleSelectValue} 
                defaultValue=""
                className={className}
            >
                <option value="" disabled>Selecciona una opción</option>
                {options.map((option) => (
                    Object.keys(option).map((nameItem) => (
                        option[nameItem].key === item ? (
                            <option key={option[nameItem].value} value={option[nameItem].value} name={option[nameItem].key}>
                                {option[nameItem].label}
                            </option>
                        ) : null
                    ))
                ))}
            </select>
        </div>
    );
    
}   

export default Select;