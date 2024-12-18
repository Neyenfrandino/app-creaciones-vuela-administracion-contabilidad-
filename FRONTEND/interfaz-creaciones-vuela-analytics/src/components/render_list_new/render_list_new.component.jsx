import { useEffect, useState, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';  

import Modal from '../modal/modal.component';
import './render_list_new.style.scss';

const INITIAL_STATE = {
    openModal: {open: false, itemSelected: null},
}

const actionTypes = {
    SET_OPEN_MODAL: 'SET_OPEN_MODAL',
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_OPEN_MODAL:
            return { ...state, openModal: action.payload };
        default:
            return state;
    }
};



const RenderListNew = ({listCategory, schemas}) => {
    const { id } = useParams();

    const [newList, setNewList] = useState([]);

    useEffect(() => {
        setNewList(listCategory);
    }, [listCategory])

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const { openModal } = state;

    const setOpenModal = (data) => {
        dispatch({ type: actionTypes.SET_OPEN_MODAL, payload: data });
    };



    console.log(openModal)

    return (
        <div className="container__render-new-list">
            <ul className="list__render-new-list">  
                {
                    newList? newList.map((item, index) => (
                        <li key={index} className="item__render-new-list" >
                            <img src={item.img_url ? item.img_url : "../../img/super_user_2.webp"} alt={`Product ${item.name_category}`} />

                            <div className='item_render_new_list-button-edit-category'>
                                <button title='Editar categoría' 
                                    onClick={() => setOpenModal({open: true, itemSelected: item})}
                                >
                                    <i className="fa fa-pencil" aria-hidden="true" />
                                </button>
                            </div>

                            <div className='item_render_new_list-button-view-products'>
                                <h3>{item.name_category}</h3>
                                <p>{item.description}</p>   
                                <Link
                                    className='item_render_new_list-button-view-products-link'
                                    to={`/inventario/categorias/${item.name_category}-${item.category_products_id}`} 
                                    // onClick={() => handleSearch(item.category_products_id)}
                                >
                                    Ver productos
                                </Link>
                            </div>
                        </li>
                    )): null
                }
            </ul>

            {
    openModal.open && (
        <Modal
            show={openModal}
            handleClose={() => setOpenModal({ open: false, itemSelected: null })}
            title="Editar categoría"
        >
            {openModal.itemSelected ? (
                <div className="modal-edit-category">
                    {Object.keys(schemas).map((item, index) => (
                        <div key={index} className="modal-edit-category__content-item">
                            <ul className="modal-edit-category__list">
                                <li className="modal-edit-category__list-item">
                                    <span className="modal-edit-category__list-title">
                                        {schemas[item][0]}:
                                    </span>
                                    
                                    {item === 'image_url' ? (
                                        <img
                                            src={
                                                openModal.itemSelected.image_url
                                                    ? openModal.itemSelected.image_url
                                                    : '../../img/super_user_2.webp'
                                            }
                                            alt={`Product ${openModal.itemSelected.name_category}`}
                                            className="modal-edit-category__image"
                                        />
                                    ) : (
                                        <span className="modal-edit-category__list-value">
                                            {openModal.itemSelected[item]}
                                        </span>
                                    )}
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="modal-edit-category__empty">No hay datos para mostrar</p>
            )}
        </Modal>
    )
}


        </div>
       
    )
}

export default RenderListNew