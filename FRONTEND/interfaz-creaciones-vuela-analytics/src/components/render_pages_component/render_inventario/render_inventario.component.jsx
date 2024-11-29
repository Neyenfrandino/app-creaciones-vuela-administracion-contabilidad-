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

const RenderInventario = ({ currentRoute, sell_product, products, setIsNewData, setIsDataCurrentRoute  }) => {
    // console.log(products, 'soy product de products')
    const [openModal, setOpenModal] = useState(false);

    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => { 
        if(!products) {
            setIsDataCurrentRoute({'products': null, 'action': 'get'})
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

        const filteredData = dataList.filter((item) => {
            return item.name_product.toLowerCase().includes(e.target.value.toLowerCase());
        });

        setFilteredData(filteredData);
    }

    const handleOpenModal = useCallback((open) => {
        setOpenModal(open);
    }, [setOpenModal]);

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
                currentRoute === 'products' && products ?
                    <>
                        <div className='products__search'>
                            <Search handleSearch={(e)=>handleSearch(e, products)} />
                            <button onClick={handleOpenModal}>Nuevo producto</button>
                        </div>

                        <RenderList 
                            list={filteredData.length > 0 ? filteredData : products}
                            schemas={schemas.products} 
                            setIsNewData={setIsNewData}
                            currentRoute={currentRoute}
                        />
                        
                    </> : null
            }


            <Modal 
                show={openModal}
                handleClose={() => {
                    setOpenModal(false); 
                    // handleActionFunc('');
                }} 
                title={currentRoute === 'products' ? 'New Product' : 'New sell product'} 
            >
                <HandleCreated 
                    valueVarObject={currentRoute === 'products' ? schemas.products : schemas.sell_product }  
                    setIsNewData={setIsNewData}
                    handleClose={() => setOpenModal(false)}
                    currentRoute={currentRoute}
                    filterData={currentRoute === 'products' ? selectCategoryProducts : filterData }
                />
            </Modal> 
        </div>
    );
}

export default RenderInventario;
