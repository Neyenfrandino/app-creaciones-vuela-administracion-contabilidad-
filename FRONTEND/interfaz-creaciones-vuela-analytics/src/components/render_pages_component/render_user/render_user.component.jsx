import { useEffect, useReducer } from "react"
import ConfigUser from "../../config_user/config_user.component"
import FuncConfigUser from "../../func_config_user/func_config_user.component"

const INITIAL_STATE = {
    isCurrentAction: "",
    isNewState: {},
    isLoading: false,
};

// Mantenemos los actionTypes locales
const types = {
    SET_CURRENT_ACTION: "SET_CURRENT_ACTION",
    SET_NEW_STATE: "SET_NEW_STATE",
    SET_LOADING: "SET_LOADING",
};

const reducer = (state, action) => {
    switch (action.type) {
        case types.SET_CURRENT_ACTION:
            return { ...state, isCurrentAction: action.payload };
        case types.SET_NEW_STATE:
            return { ...state, isNewState: action.payload };
        case types.SET_LOADING:
            return { ...state, isLoading: action.payload };

        default:
            return state;
    }
};


const RenderUser = ({ currentRoute, dataUser_db, actionTypes, setIsNewData}) => {
   
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const { isCurrentAction, isNewState, isLoading } = state;

    const setIsCurrentAction = (data) => {

        dispatch({ type: types.SET_CURRENT_ACTION, payload: data });
    }

    const setIsNewState = (data) => {
        dispatch({ type: types.SET_NEW_STATE, payload: data });
    }

    const setIsLoading = (data) => {
        dispatch({ type: types.SET_LOADING, payload: data });
    }
    
    // console.log(isCurrentAction, "hola mundo")
    useEffect(()=> {
        if (isCurrentAction === 'save' && isNewState !== null){
            console.log('enviando info')
            setIsNewData({
                [currentRoute]: isNewState,
                action: 'update'
            })
            setIsCurrentAction('')
          
        }  else if (isCurrentAction === 'delete'){
            console.log('eliminando')
            setIsNewData({
                [currentRoute]: null,
                action : 'delete'
            })
        }
    }, [isNewState, isCurrentAction])

    console.log(dataUser_db)
    return (
        <div>
            {
                currentRoute === 'profile' && dataUser_db ? (
                    <div className='gestion_stock__content--bento'>
                    <ConfigUser
                        usuario={dataUser_db}
                        currentAction={isCurrentAction}
                        usuarioA={{ photo: 'img/logo.jpg' }}
                        setIsNewState={setIsNewState}
                    />

                    <FuncConfigUser actionTypes={actionTypes} setIsCurrentAction={setIsCurrentAction}>
                        <button 
                            onClick={() => setIsCurrentAction('save')} 
                            className={`save_changes${isCurrentAction !== 'update' ? '--disabled' : ''}`}
                            disabled={isCurrentAction !== 'update'}
                        >
                            {isCurrentAction === 'update' ? 'Guardar cambios' : 'Cambios deshabilitados'}           
                        </button>
                    </FuncConfigUser>
                </div>): null
            }
           
        </div>
    )
}

export default RenderUser