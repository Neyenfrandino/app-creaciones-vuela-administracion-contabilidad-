import { useEffect, useReducer, useRef } from 'react';
import Modal from '../modal/modal.component';
import { renderImgCompressed } from '../config_user/config_user.component';
import './render_list.style.scss';


const INITIAL_STATE = {
    isHovered: { keyItem: null, isHovered: false },
    showMoreInfo: { item: null, showMoreInfo: false },
    actionButton: { action: null, actionDataId: null },
    updateValue: null,
    previewImage: null,
    isLoading: false
};

const actionTypes = {
    SET_HOVERED: 'SET_HOVERED',
    SET_SHOW_MORE_INFO: 'SET_SHOW_MORE_INFO',
    SET_ACTION_BUTTON: 'SET_ACTION_BUTTON',
    SET_UPDATE_VALUE: 'SET_UPDATE_VALUE',
    RESET_UPDATE_VALUE: 'RESET_UPDATE_VALUE',
    SET_PREVIEW_IMAGE: 'SET_PREVIEW_IMAGE',
    SET_LOADING: 'SET_LOADING'
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_HOVERED:
            return { ...state, isHovered: action.payload };
        case actionTypes.SET_SHOW_MORE_INFO:
            return { ...state, showMoreInfo: action.payload };
        case actionTypes.SET_ACTION_BUTTON:
            return { ...state, actionButton: action.payload };
        case actionTypes.SET_UPDATE_VALUE:
            return { 
                ...state, 
                updateValue: { 
                    ...state.updateValue, 
                    [action.payload.key]: action.payload.value 
                }
            };
        case actionTypes.RESET_UPDATE_VALUE:
            return { 
                ...state, 
                updateValue: action.payload, 
                previewImage: null 
            };
        case actionTypes.SET_PREVIEW_IMAGE:
            return { ...state, previewImage: action.payload };
        case actionTypes.SET_LOADING:
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};


const RenderList = ({ list, schemas, openConfirmation, handleStateCreated, handleActionFunc, setIsNewData, currentRoute }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const fileInputRef = useRef(null);

    const setIsHovered = (keyItem, isHovered) => {
        dispatch({ type: actionTypes.SET_HOVERED, payload: { isHovered, keyItem } });
    };

    const setShowMoreInfo = (item, showMoreInfo) => {
        dispatch({ type: actionTypes.RESET_UPDATE_VALUE, payload: { ...item } });
        dispatch({ type: actionTypes.SET_SHOW_MORE_INFO, payload: { showMoreInfo, item } });
    };

    const setActionButton = (action, actionDataId) => {
        if (!action) {
            dispatch({ type: actionTypes.SET_PREVIEW_IMAGE, payload: null });
        }
        dispatch({ type: actionTypes.SET_ACTION_BUTTON, payload: { action, actionDataId } });
    };

    const setUpdateValue = (value, key) => {
        dispatch({ type: actionTypes.SET_UPDATE_VALUE, payload: { value, key } });
    };

    const handleFileChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file) {
            try {
                dispatch({ type: actionTypes.SET_LOADING, payload: true });

                const compressedImage = await renderImgCompressed(file, 500, 500, 0.7);
                
                if (compressedImage) {
                    // Actualizar tanto la vista previa como el valor del estado
                    dispatch({ type: actionTypes.SET_PREVIEW_IMAGE, payload: compressedImage });
                    setUpdateValue(compressedImage, 'image_url');
                }
            } catch (error) {
                console.error('Error al procesar la imagen:', error);
                // Aquí podrías agregar un estado para manejar errores y mostrarlos en la UI
            } finally {
                dispatch({ type: actionTypes.SET_LOADING, payload: false });
            }
        }
    };

    const handleSaveUpdate = async () => {
        try {
            dispatch({ type: actionTypes.SET_LOADING, payload: true });

            if(state.updateValue){

                setIsNewData({
                    [currentRoute]: state.updateValue,
                    action: 'update'
                  })
                setTimeout(() => {
                    handleCloseModal();
                }, 1500);
            }
            
            // Actualizar el item en showMoreInfo con los nuevos valores
            setShowMoreInfo(state.updateValue, true);
            // Limpiar el estado de edición
            setActionButton(null, null);
            
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        } finally {
            dispatch({ type: actionTypes.SET_LOADING, payload: false });
        }
    };


    const handleDelete = async () => {
        try {
            dispatch({ type: actionTypes.SET_LOADING, payload: true });

            if(state.actionButton.action === 'delete'){
                // handleActionFunc(state.actionButton)
                setIsNewData({
                    [currentRoute]: null,
                    action: 'delete'
                  })
            }
            
            setActionButton(null, null);
            
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
        } finally {
            dispatch({ type: actionTypes.SET_LOADING, payload: false });
        }
    };

    useEffect(() => {
        if(state.actionButton.action === 'delete'){
            handleDelete();
        }
    }, [state.actionButton.action])

    const handleCloseModal = () => {
        setShowMoreInfo(null, false);
        setActionButton(null, null);
        dispatch({ type: actionTypes.SET_PREVIEW_IMAGE, payload: null });
    };

    const { isHovered, showMoreInfo, actionButton, updateValue, previewImage, isLoading } = state;

    return (
        <div className="container__render-list">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            
            <ul className="list__render-list">
                {list.map((item, index) => (
                    <li key={index} className="item__render-list" >
                        <div className="item__render-list-image">
                            <img 
                                src={item.image_url || "../../img/logo.jpg"} 
                                alt={`Product ${item.name_product}`} 
                            />
                        </div>
                        <div className="item__render-list-info">
                            <span className="item__render-list-name-products">
                                {item.name_product}
                            </span>
                            <span className="item__render-list-description-products">
                                {item.description_product}
                            </span>
                        </div>

                        <div className='item__render-list-button'>
                                                        
                            <button 
                                onClick={() => !showMoreInfo.showMoreInfo && setShowMoreInfo(item, true)}
                                disabled={isLoading}
                            >
                                <i className="fa fa-eye" aria-hidden="true" />  
                            </button>

                            <button 
                                onClick={() => {setActionButton('delete', item)}}
                                disabled={isLoading}
                            >
                                <i className="fa fa-trash" aria-hidden="true" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {showMoreInfo.showMoreInfo && (
                <Modal 
                    show={showMoreInfo.showMoreInfo} 
                    handleClose={handleCloseModal}
                    title="Product Info"
                >
                    <div className="modal-content">
                        {Object.keys(schemas).map((key, index) => (
                            showMoreInfo.item && showMoreInfo.item[key] !== undefined && (
                                <ul key={index} 
                                    className="modal-content-item" 
                                    onMouseEnter={() => setIsHovered(key, true)}
                                    onMouseLeave={() => setIsHovered(null, false)}>
                                    
                                    <li className="modal-content-item-title">
                                        {key === 'image_url' ? '' : `${schemas[key][0]}:`}
                                    </li>
                                    
                                    {actionButton.action === 'update' && actionButton.actionDataId === key ? (
                                        key === 'image_url' ? (
                                            <div className="modal-content-item-value-img">
                                                {isLoading ? (
                                                    <div className="loading-indicator">
                                                        Procesando imagen...
                                                    </div>
                                                ) : (
                                                    <img 
                                                        className="img" 
                                                        src={previewImage || showMoreInfo.item[key]} 
                                                        alt={`Product ${showMoreInfo.item.name_product}`} 
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <input 
                                                type={schemas[key][2]} 
                                                className="modal-content-item-input" 
                                                value={updateValue[key] || ''}
                                                onChange={(e) => setUpdateValue(e.target.value, key)}
                                            />
                                        )
                                    ) : (
                                        <li className={`modal-content-item-value-${key === 'image_url' ? 'img' : ''}`}>
                                            {key === 'image_url' ? (
                                                <img 
                                                    className="img" 
                                                    src={showMoreInfo.item[key]} 
                                                    alt={`Product ${showMoreInfo.item.name_product}`} 
                                                />
                                            ) : (
                                                <p>{showMoreInfo.item[key]}</p>
                                            )}
                                        </li>
                                    )}
                                    
                                    {isHovered.isHovered && isHovered.keyItem === key && (
                                        <div className="modal-content-item-buttons">
                                            {actionButton.action === 'update' && actionButton.actionDataId === key ? (
                                                <>
                                                    <button 
                                                        onClick={handleSaveUpdate}
                                                        disabled={isLoading}
                                                    >
                                                        <i className="fas fa-save" aria-hidden="true" />
                                                    </button>
                                                    <button 
                                                        onClick={() => setActionButton(null, null)}
                                                        disabled={isLoading}
                                                    >
                                                        <i className="fas fa-times" aria-hidden="true" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        onClick={() => {
                                                            if (key === 'image_url') {
                                                                fileInputRef.current.click();
                                                            }
                                                            setActionButton('update', key);
                                                        }}
                                                        disabled={isLoading}
                                                    >
                                                        <i className="fa fa-pencil" aria-hidden="true" />
                                                    </button>

                                                </>
                                            )}
                                        </div>
                                    )}
                                </ul>
                            )
                        ))}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default RenderList;