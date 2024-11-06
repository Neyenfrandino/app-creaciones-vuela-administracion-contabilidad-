
import ConfigUser from "../../config_user/config_user.component"
import FuncConfigUser from "../../func_config_user/func_config_user.component"


const RenderUser = ({ currentPath, dataUser_db, openConfirmation, handleUserStateChange, actionFunc, dataFunc, handleActionFunc  }) => {
    return (
        <div>
            {
                currentPath === '/profile' && dataUser_db?.userData ? (
                    <div className='gestion_stock__content--bento'>
                    <ConfigUser
                        usuario={dataUser_db.userData}
                        typeFunc={actionFunc}
                        usuarioA={{ photo: 'img/logo.jpg' }}
                        onStateChange={handleUserStateChange}
                    />
                    <FuncConfigUser dataFunc={dataFunc} setkeyQuery={handleActionFunc}>
                        <button 
                            onClick={openConfirmation} 
                            className={`save_changes${actionFunc !== 'update' ? '--disabled' : ''}`}
                            disabled={actionFunc !== 'update'}
                        >
                            {actionFunc === 'update' ? 'Guardar cambios' : 'Cambios deshabilitados'}           
                        </button>
                    </FuncConfigUser>
                </div>): null
            }
           
        </div>
    )
}

export default RenderUser