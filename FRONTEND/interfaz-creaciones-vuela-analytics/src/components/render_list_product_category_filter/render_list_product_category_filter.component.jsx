import { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';

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

const RenderListProductCategoryFilter = ({ listCategory, products }) => {
    const location = useLocation();
    const referenceQuery = location.pathname.split('/')[3]?.split('-') || [];
    const id = referenceQuery[1];
    const nameCategory = referenceQuery[0].split('%20').join(' ');
    
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { isSearch } = state;

    const setIsSearch = (filteredData) => {
        dispatch({ type: actionTypes.SET_SEARCH, payload: filteredData });
    };

    useEffect(() => {
        if (id && Array.isArray(products) && products.length > 0) {
            const filteredData = products.filter((item) => {
                return item.category_of_products_id.toString() === id.toString();
            });
            setIsSearch(filteredData);
        } else {
            console.warn('Products array is empty or id is invalid');
            setIsSearch([]);
        }
    }, [id, products]);

    console.log(isSearch, 'hola mundo');

    return (
        <div>
            <h1>Categoría: {nameCategory}</h1>
            {isSearch.length > 0 ? (
                <ul>
                    {isSearch.map((asd) => (
                        <li key={asd.id}>{asd.name_product}</li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos disponibles en esta categoría.</p>
            )}
        </div>
    );
};

export default RenderListProductCategoryFilter;
