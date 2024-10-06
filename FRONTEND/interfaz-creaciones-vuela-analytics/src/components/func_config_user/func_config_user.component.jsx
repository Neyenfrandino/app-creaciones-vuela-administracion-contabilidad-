import './func_config_user.style.scss';

const FuncConfigUser = ({ dataFunc, setkeyQuery }) => {

    return (
        <div className='profile__content--function'>

        <div className="profile__content--function__title">
            <h4>Funciones</h4>
        </div>

        <div className="profile__content--function__items">
            {
            
                Object.keys(dataFunc).map((key, index) => {
                    if (key === 'defaultValue' || key === 'section_title') {
                        return null;
                        
                    }
                    return (
                        <div key={index} className="profile__content--function__item">
                            <button onClick={() => setkeyQuery(key)}>{dataFunc[key]}</button>
                        </div>
                    );
                })

            }

            <div>
                <button>Guardar</button>
            </div>
        </div>

    </div>
    )
}

export default FuncConfigUser;