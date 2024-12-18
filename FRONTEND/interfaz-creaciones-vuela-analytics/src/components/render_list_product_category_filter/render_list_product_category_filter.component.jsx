
import { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import './render_list_product_category_filter.style.scss';

const INITIAL_STATE = {
    isSearch: [],
};

const actionTypes = {
    SET_SEARCH: 'SET_SEARCH',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH:
            return { ...state, isSearch: action.payload };
        default:
            return state;
    }
};

const RenderListProductCategoryFilter = ({ products, setkeyQuery }) => {
    const location = useLocation();
    const referenceQuery = location.pathname.split('/')[3]?.split('-') || [];
    const id = referenceQuery[1];
    const nameCategory = referenceQuery[0].split('%20').join(' ');

    const sessionStotageProduct = sessionStorage.getItem('products-get');
    const productsSession = JSON.parse(sessionStotageProduct);

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { isSearch } = state;

    const setIsSearch = (filteredData) => {
        dispatch({ type: actionTypes.SET_SEARCH, payload: filteredData });
    };

    useEffect(() => {
        if (id && (Array.isArray(products) || Array.isArray(productsSession))) {
            const source = products && products.length > 0 ? products : productsSession;
            if (Array.isArray(source) && source.length > 0) {
                const filteredData = source.filter((item) => 
                    item.category_of_products_id.toString() === id.toString()
                );
                setIsSearch(filteredData);
            } else {
                console.warn('Source array is empty');
                setIsSearch([]);
            }
        } else {
            console.warn('Products array is invalid or id is missing');
            setIsSearch([]);
        }
    }, [id, products, productsSession]);

    return (
        <div className='container__render-list-product-category-filter'>
            <div className='render_list_product_category_filter__header-container'>
                <h1 className='render_list_product_category_filter__header'>
                    Categoría: "{nameCategory}"
                </h1> 
            </div>

            <div className='render_list_product_category_filter__body-container'>
                {isSearch.length > 0 ? (
                    <ul className='product-list'>
                        {isSearch.map((product) => (
                            <li key={product.id} className='product-item'>
                                <div className='product-image'>
                                    <img 
                                        src={product.img_url ? product.img_url : "../../img/super_user_2.webp"} 
                                        alt={`Product ${product.name_product}`} 
                                    />
                                    <div className='product-text'>
                                        <p className='product-title'>{product.name_product}</p>
                                        <span className='product-description'>{product.description_product}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay productos disponibles en esta categoría.</p>
                )}
            </div>
        </div>
    );
};

export default RenderListProductCategoryFilter;
