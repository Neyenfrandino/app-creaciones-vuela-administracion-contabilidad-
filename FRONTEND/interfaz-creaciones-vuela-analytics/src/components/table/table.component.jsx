import React, { useEffect, useState, useRef, useCallback } from 'react';
import './table.style.scss';

const Table = ({ data, handleOpenModal, handleUserStateChange, openConfirmation }) => {   
    data = data.sell_products

    const [editingCell, setEditingCell] = useState({ rowIndex: null, field: null });
    const [actionButton, setActionButton] = useState({ action: null, actionDataId: null });
    const [tableData, setTableData] = useState(data);
    const [newState, setNewState] = useState({});
    const editableRef = useRef(null);


    useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleStartEditing = useCallback((rowIndex, field) => {
        setEditingCell({ rowIndex, field });
    }, []);

    const handleCellChange = useCallback((index, field) => {
        if (editableRef.current) {
            setTableData(prevData => {
                const updatedData = [...prevData];
                updatedData[index] = {
                    ...updatedData[index],
                    [field]: editableRef.current.textContent
                };
                setNewState(updatedData[index]);
                return updatedData;
            });
        }
    }, []);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            event.preventDefault();
            editableRef.current?.blur();
        }
    }, []);

    const renderCell = useCallback((item, index, field) => {
        const isEditing = editingCell.rowIndex === index && editingCell.field === field;
        const value = field === 'paid' ? (item[field] ? 'Sí' : 'No') :
                     field === 'total' ? (item.price_unit * item.quantity_sell) :
                     item[field];

        const isEditable = actionButton.action === 'update' && 
                          actionButton.actionDataId === item.sell_product_id;

        return (
            <span
                ref={isEditing ? editableRef : null}
                className={`editable-cell ${isEditing && isEditable ? 'editing' : ''}`}
                contentEditable={isEditable ? isEditing : false}
                suppressContentEditableWarning
                onBlur={() => {
                    handleCellChange(index, field);
                    setEditingCell({ rowIndex: null, field: null });
                }}
                onKeyDown={handleKeyDown}
                onClick={() => handleStartEditing(index, field)}
            >
                {value}
            </span>
        );
    }, [editingCell, actionButton, handleKeyDown, handleStartEditing, handleCellChange]);


    const handleOnclickSubmit = useCallback((event) => {
        event.preventDefault();
        // console.log(event.target.getAttribute('action'), event.target.textContent);
        if(event.target.getAttribute('action') === 'save'){

            handleUserStateChange(newState, 'update');
            openConfirmation()

            setActionButton({
                action: null,
                actionDataId: null
            });

            return;
        }

        if(event.target.getAttribute('action') === 'cancelar'){
            setActionButton({
                action: null,
                actionDataId: null
            });
            setTableData(data);
            return;
        }
    },[newState]);

        
    return (
        <div className="table-container">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Fecha de Venta</th>
                        <th>Pagado</th>
                        <th>Método de Pago</th>
                        <th>Precio Unitario</th>
                        <th>Cantidad Vendida</th>
                        <th>Total</th>
                        <th>ID Producto</th>
                        <th>
                            <button /* onClick={() => setActionButton({ action: 'create', actionDataId: null })} */ onClick={() => handleOpenModal(true)}>
                                <i className="fa fa-plus" aria-hidden="true" /> 
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData && tableData?.map((item, index) => (
                        <tr
                            key={item.sell_product_id || index}
                            className={actionButton.action === 'update' && 
                                     actionButton.actionDataId === item.sell_product_id ? 
                                     'data-selected' : ''}
                        >
                            {['date_sell', 'paid', 'payment_method', 'price_unit', 
                              'quantity_sell', 'total', 'products_id'].map(field => (
                                <td key={field}>{renderCell(item, index, field)}</td>
                            ))}
                            <td>
                                {actionButton.action === 'update' && 
                                 actionButton.actionDataId === item.sell_product_id ? (
                                    <>
                                        <button onClick={handleOnclickSubmit}>
                                            <i action={'save'} className="fas fa-save" aria-hidden="true" />
                                        </button>
                                        <button onClick={handleOnclickSubmit}>
                                            <i action={'cancelar'} className="fas fa-times" aria-hidden="true" />
                                        </button>
                                    </>
                                   
                                ) : (
                                    <>
                                        <button onClick={() => setActionButton({
                                            action: 'update',
                                            actionDataId: item.sell_product_id
                                        })}>
                                            <i className="fa fa-pencil" aria-hidden="true" />
                                        </button>
                                        <button onClick={() => setActionButton({
                                            action: 'delete',
                                            actionDataId: item.sell_product_id
                                        })}>
                                            <i className="fa fa-trash" aria-hidden="true" />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;