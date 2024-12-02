import { useEffect, useState, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';  
import './render_list_new.style.scss';


// const INITIAL_STATE = {
//     isSearch: '',
// }

// const actionTypes = {
//     SET_SEARCH: 'SET_SEARCH',
// }

// const reducer = (state, action) => {
//     switch (action.type) {
//         case actionTypes.SET_SEARCH:
//             return { ...state, isSearch: action.payload };
//         default:
//             return state;
//     }
// }

const RenderListNew = ({listCategory, products}) => {
    const { id } = useParams();

    const [newList, setNewList] = useState([]);

    useEffect(() => {
        setNewList(listCategory);
    }, [listCategory])



    // const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    // const { isSearch } = state;

    // const setIsSearch = (isSearch) => {
    //     dispatch({ type: actionTypes.SET_SEARCH, payload: isSearch });
    // }
    
    // const handleSearch = (itemId) => {
    //     const filteredData = products.filter((item) =>
    //         item.category_of_products_id === itemId    
    //     );
    //     setIsSearch(filteredData);
    // }
    console.log(newList, 'hola mundo')
    return (
        <div className="container__render-new-list">
            <ul className="list__render-new-list">  
                {
                    newList? newList.map((item, index) => (
                        <li key={index} className="item__render-new-list" >
                            <img src={item.img_url ? item.img_url : "../../img/super_user_2.webp"} alt={`Product ${item.name_category}`} />

                            <div className='item_render_new_list-button-edit-category'>
                                <button title='Editar categoría'>
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

        </div>
       
    )
}

export default RenderListNew