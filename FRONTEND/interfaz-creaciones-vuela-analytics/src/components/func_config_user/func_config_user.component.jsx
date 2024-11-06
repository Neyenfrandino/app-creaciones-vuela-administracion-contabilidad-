import './func_config_user.style.scss';

const FuncConfigUser = ({ dataFunc, setkeyQuery, children }) => {

    return (
        <div className='profile__content--function'>
            <div className="profile__content--function__items">
                {
                    Object.keys(dataFunc).map((key, index) => {
                        return (
                            <div key={index} className="profile__content--function__item">
                                <button onClick={() => setkeyQuery(key)}>{key.toUpperCase()}</button>
                            </div>
                        );
                    })

                }
                {children}
            </div>

        </div>
    )
}

export default FuncConfigUser;