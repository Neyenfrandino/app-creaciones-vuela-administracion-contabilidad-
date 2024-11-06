import { useState, useCallback, useEffect } from 'react';

import Table from "../../table/table.component"
import Modal from "../../modal/modal.component"
import HandleCreated from "../../handle_created/handle_created.component"


import schemas from '../../../schemas.json';

// import './render_inventario.style.scss';
const RenderInventario = ({ currentPath, dataUser_db, openConfirmation, handleUserStateChange, handleActionFunc, setModalOpen, modalOpen}) => {
    


    const handleOpenModal = useCallback((open) => {
        setModalOpen(open);
        // setActionFunc()
    }, []);

    const filterProductsTag = dataUser_db?.products?.map(item => {
       
        return { 
            key: 'products_id',
            value: item.products_id, 
            label: item.name_product 
        };
    }) || [];

    const filterDataSell = [
        {
            key: 'paid',
            value: true, // Esto representa que está "pagado"
            label: 'sí'
        },
        {
            key: 'paid',
            value: false, // Esto representa que no está "pagado"
            label: 'no'
        }
    ];

    const filterPaymentMethod = [
        {
            key: 'payment_method',
            value: 'cash',
            label: 'Efectivo'
        },
        {
            key: 'payment_method',
            value: 'credit_card',
            label: 'Tarjeta de Crédito'
        },
        {
            key: 'payment_method',
            value: 'bank_transfer',
            label: 'Transferencia Bancaria'
        },
        {
            key: 'payment_method',
            value: 'paypal',
            label: 'PayPal'
        },
        {
            key: 'payment_method',
            value: 'bitcoin',
            label: 'Bitcoin'
        },
        {
            key: 'payment_method',
            value: 'cryptocurrency',
            label: 'Criptomoneda'
        },
        {
            key: 'payment_method',
            value: 'other',
            label: 'Otro'
        }
    ];

    const filterData = [
        filterProductsTag,
        filterDataSell,
        filterPaymentMethod
    ]

 
    return (
        <div>
            {
                currentPath === '/inventario/sell-products' && dataUser_db?.sell_products || dataUser_db?.products ? (
                    <>
                        <Table 
                            data={dataUser_db} 
                            handleOpenModal={handleOpenModal} 
                            handleUserStateChange={handleUserStateChange} 
                            openConfirmation={openConfirmation} 
                        />
                      
                        <Modal 
                            show={modalOpen} 
                            handleClose={() => {
                                setModalOpen(false) 
                                handleActionFunc('')} } 
                            title='Crear Producto'
                        >

                            <HandleCreated 
                                valueVarObject={schemas.sell_product} 
                                openConfirmation={openConfirmation} 
                                handleStateCreated={handleUserStateChange} 
                                handleClose={() => setModalOpen(false) }
                                handleActionFunc={handleActionFunc}
                                filterData={filterData}
                            />
                        </Modal>

                    </>
                ): null
            }

        </div>
    )
}

export default RenderInventario