import { useState, useCallback, useEffect } from 'react';

// Sell Products
import Table from "../../table/table.component";
import Modal from "../../modal/modal.component";
import HandleCreated from "../../handle_created/handle_created.component";
import Search from "../../search/search.component";

// Products 
import RenderList from '../../render_list/render_list.component';

import RenderListNew from '../../render_list_new/render_list_new.component';

import schemas from '../../../schemas.json';

import './render_inventario.styles.scss';

const RenderInventario = ({ currentRoute, sell_product, products, setIsNewData, setIsDataCurrentRoute, category }) => {
    // console.log(products, 'soy product de products')
    const [openModal, setOpenModal] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [isSelected, setIsSelected] = useState('category');

    useEffect(() => { 
        if(!products) {
            setIsDataCurrentRoute({products: null, action: 'get'})
            return
        }

        if (!category) {
            setIsDataCurrentRoute({ category: null, action: 'get' });
            return
        }
    }, []);

    const filterProductsTag = products?.map(item => ({
        key: 'products_id',
        value: item.products_id,
        label: item.name_product
      })) || [];


    const filterDataSell = [
        { key: 'paid', value: true, label: 'Sí' },
        { key: 'paid', value: false, label: 'No' }
    ];

    const filterPaymentMethod = [
        { key: 'payment_method', value: 'cash', label: 'Efectivo' },
        { key: 'payment_method', value: 'credit_card', label: 'Tarjeta de Crédito' },
        { key: 'payment_method', value: 'bank_transfer', label: 'Transferencia Bancaria' },
        { key: 'payment_method', value: 'paypal', label: 'PayPal' },
        { key: 'payment_method', value: 'bitcoin', label: 'Bitcoin' },
        { key: 'payment_method', value: 'cryptocurrency', label: 'Criptomoneda' },
        { key: 'payment_method', value: 'other', label: 'Otro' }
    ];

    const selectCategoryProducts = [
        // console.log(category)
        category && category.length > 0 ? category?.map(item => ({
            key: 'category_of_products_id',
            value: item.category_products_id,
            label: item.name_category
        })) : [],
    
    ] || []

    const filterData = [
        filterProductsTag,
        filterDataSell,
        filterPaymentMethod
    ] 
    
    const handleSearch = (e, dataList, name) => {
        const searchTerm = e.target.value.toLowerCase();
    
        // Si el campo de búsqueda está vacío, retorna los datos completos
        if (!searchTerm) {
            setFilteredData(dataList);
            return;
        }
    
        // Filtrar los datos por la propiedad indicada (por ejemplo, "name")
        const filteredData = dataList.filter((item) =>
            item[name].toLowerCase().includes(searchTerm)
        );
    
        // Actualiza el estado con los datos filtrados
        setFilteredData(filteredData);
    }
    

    const handleOpenModal = useCallback((open) => {
        setOpenModal(open);
    }, [setOpenModal]);

    const handleOnchangeSelect = (e) => {
        setIsSelected(e.target.value)
    }
    
    return (
        
        <div>
            {currentRoute === 'sell' && sell_product ? (
                <>
                    <Table 
                        data={sell_product}
                        setIsNewData={setIsNewData}
                        currentRoute={currentRoute}
                        setOpenModal={setOpenModal}
                        filterProductsTag={filterProductsTag}
                    />
                </>

            ) : null}
 
 
            {
                currentRoute === 'category' && category ?
                    <>
                        <div className='products__search'>                      
                            <select className='products__search-select' name="category_and_product" onChange={(e)=> handleOnchangeSelect(e)} defaultValue="">
                                <option value="" disabled>Selecciona una opción</option>
                                <option value="category">Categoría</option>
                                <option value="product">Producto</option>
                            </select>
                            
                            <Search handleSearch={(e) => handleSearch(e, isSelected === 'category' ? category : products, isSelected === 'category' ? 'name_category' : 'name_product')}/>

                            <button 
                                onClick={handleOpenModal}>{isSelected === 'category' ? 'Nuevo categoría' : 'Nuevo producto'}
                            </button>

                        </div>

                        
                        {
                            isSelected === 'category' ? 
                                <RenderListNew 
                                    listCategory={filteredData.length > 0 ? filteredData : category} 
                                    schemas={schemas.category_products} 
                                /> : 

                                <RenderList 
                                    list={filteredData.length > 0 ? filteredData : products}
                                    schemas={schemas.products} 
                                    setIsNewData={setIsNewData}
                                    currentRoute={isSelected === 'category' ? 'category' : 'products'}
                                />
                        }
                        
                    </> : null
            }


            <Modal 
                show={openModal}
                handleClose={() => {setOpenModal(false)}} 
                title={currentRoute === 'sell' ? 'new sell product' : isSelected === 'category' ? 'new category' : 'new product'}
            >
                <HandleCreated 
                    valueVarObject={currentRoute === 'sell' ? schemas.sell_product : isSelected === 'category' ? schemas.category_products : schemas.products}  
                    setIsNewData={setIsNewData}
                    handleClose={() => setOpenModal(false)}
                    currentRoute={isSelected === 'category' ? 'category' : 'products'}
                    filterData={currentRoute === 'sell' ? filterData : isSelected === 'category' ? '' : selectCategoryProducts }
                />
            </Modal> 
        </div>
    );
}

export default RenderInventario;
