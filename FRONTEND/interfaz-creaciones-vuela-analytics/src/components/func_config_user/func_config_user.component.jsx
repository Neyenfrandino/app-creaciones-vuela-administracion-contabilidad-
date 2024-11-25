import './func_config_user.style.scss';

const FuncConfigUser = ({ actionTypes, setIsCurrentAction, children }) => {

    return (
        <div className='profile__content--function'>
            <div className="profile__content--function__items">
                {
                    Object.keys(actionTypes).map((key, index) => {
                        return (
                            <div key={index} className="profile__content--function__item">
                                <button onClick={() => setIsCurrentAction(key)}>{actionTypes[key].toUpperCase()}</button>
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