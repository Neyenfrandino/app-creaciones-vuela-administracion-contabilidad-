import './check_update_action.style.scss';

const CheckUpdateAction = ({handleOnClick}) => {

    return (
        <div className='check_update_action__container'>
            <div className='check_update_action__content--container'>
                <div className='check_update_action__header'>
                    <h4>Confirmacion de acction</h4>
                    <span>Esta accion no puede ser revertida una ves que se ha realizado</span>
                    <span><strong>¿Está seguro de que desea realizar esta accion?</strong></span>
                </div>

                <div className='check_update_action__content'>
                    <button 
                        onClick={() => handleOnClick('Si')} 
                        className='yes-button'
                    >
                        Si
                    </button>

                    <button 
                        onClick={() => handleOnClick('No')} 
                        className='no-button'
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckUpdateAction;