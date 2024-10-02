import './form.style.scss';

const Form = ({label, ...otherProps}) => {
    const { inputId, className } = otherProps;

    return (
        <div className='formInput__container'>
            {label && 
                <label htmlFor={inputId} className={`formInput__label`}>{label}</label>
            }
            <input {...otherProps} className={`formInput__input ${className}`} />
        </div>
    )
}

export default Form;