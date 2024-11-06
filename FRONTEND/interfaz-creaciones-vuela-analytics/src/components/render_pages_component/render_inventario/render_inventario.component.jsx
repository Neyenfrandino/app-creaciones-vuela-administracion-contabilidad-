import { useState, useCallback } from 'react';

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

    const filterData = dataUser_db?.products?.map(item => {
       
        return { 
            key: 'products_id',
            value: item.products_id, 
            label: item.name_product 
        };
    }) || [];

    const filterDataVendido = {
        key: 'paid',
        value: 'si' ? true : false,
        label: 'Pagado ?'

    }
    console.log(dataUser_db)
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