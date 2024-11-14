import { useState, useCallback, useEffect } from 'react';

// Sell Products
import Table from "../../table/table.component";
import Modal from "../../modal/modal.component";
import HandleCreated from "../../handle_created/handle_created.component";
import Search from "../../search/search.component";

// Products 
import RenderList from '../../render_list/render_list.component';

import schemas from '../../../schemas.json';

import './render_inventario.styles.scss';

const RenderInventario = ({ 
    currentPath, 
    dataUser_db, 
    openConfirmation, 
    handleUserStateChange, 
    handleActionFunc, 
    setModalOpen, 
    modalOpen 
}) => {
    
    useEffect(() => {
        if (schemas.sell_product.products_id[3] === 'get_products') {
            handleActionFunc(schemas.sell_product.products_id[3]);
        }
    }, []);
    
    
    const cachedData = sessionStorage.getItem(`sell-products-get_products`);
    const cachedProductsParsed = cachedData ? JSON.parse(cachedData) : null;
    const [filteredData, setFilteredData] = useState([]);
  

    const filterProductsTag = cachedProductsParsed?.products?.map(item => ({
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
        [
            { key: 'category_of_products_id', value: '1', label: 'Electrónica' },
            { key: 'category_of_products_id', value: '2', label: 'Electrónica' },
            { key: 'category_of_products_id', value: '3', label: 'Electrónica' },
            { key: 'category_of_products_id', value: '4', label: 'Electrónica' },
        ]
    ]

    const filterData = [
        filterProductsTag,
        filterDataSell,
        filterPaymentMethod
    ] 


    const handleSearch = (e, dataList) => {
        // console.log(e.target.value, 'hola mundo')
        // console.log(dataList, 'hola mundo')
        const filteredData = dataList.filter((item) => {
            return item.name_product.toLowerCase().includes(e.target.value.toLowerCase());
        });
        // console.log(filteredData, 'hola mundo')
        setFilteredData(filteredData);
    }

    const handleOpenModal = useCallback((open) => {
        setModalOpen(open);
    }, [setModalOpen]);

    return (
        <div>
            {currentPath === '/inventario/sell-products' && (dataUser_db?.sell_products || dataUser_db?.products) ? (
                <>
                    <Table 
                        data={dataUser_db} 
                        handleOpenModal={handleOpenModal} 
                        handleUserStateChange={handleUserStateChange} 
                        openConfirmation={openConfirmation} 
                        filterProductsTag={filterProductsTag}
                    />
                  

                </>

            ) : null}
 
            {
                currentPath === '/inventario/products' && (dataUser_db?.products) ? 
                    <>
                        <div className='products__search'>
                            <Search handleSearch={(e)=>handleSearch(e, dataUser_db.products)} />
                            <button onClick={handleOpenModal}>Nuevo producto</button>
                        </div>

                        <RenderList 
                            list={filteredData.length > 0 ? filteredData : dataUser_db.products}
                            schemas={schemas.products} 
                            openConfirmation={openConfirmation} 
                            handleStateCreated={handleUserStateChange}  
                            handleActionFunc={handleActionFunc}
                        />
                        
                    </> : null
            }


            <Modal 
                show={modalOpen} 
                handleClose={() => {
                    setModalOpen(false); 
                    handleActionFunc('');
                }} 
                title={currentPath === '/inventario/products' ? 'New Product' : 'Ne sell product'}
            >
                <HandleCreated 
                    valueVarObject={currentPath === '/inventario/products' ? schemas.products : schemas.sell_product} 
                    openConfirmation={openConfirmation} 
                    handleStateCreated={handleUserStateChange} 
                    handleClose={() => setModalOpen(false)}
                    handleActionFunc={handleActionFunc}
                    filterData={currentPath === '/inventario/products' ? selectCategoryProducts : filterData}
                />
            </Modal>
        </div>
    );
}

export default RenderInventario;
