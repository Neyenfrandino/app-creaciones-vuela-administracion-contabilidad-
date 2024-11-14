import React, { useEffect, useState, useRef, useCallback } from 'react';
import './table.style.scss';

const Table = ({ data, handleOpenModal, handleUserStateChange, openConfirmation, filterProductsTag }) => {   
    data = data.sell_products || [];

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
                    [field]: editableRef.current.textContent,
                };
                setNewState(updatedData[index]);
                return updatedData;
            });
        }
    }, []);

    const handleKeyDown = useCallback((event) => {
        if (['Enter', 'Escape'].includes(event.key)) {
            event.preventDefault();
            editableRef.current?.blur();
        }
    }, []);


    const renderCell = useCallback((item, index, field) => {
        // console.log( item.products_id)
        const isEditing = editingCell.rowIndex === index && editingCell.field === field;

        const product = filterProductsTag.find(iteem => iteem.value == item.products_id);
        
        const value = field === 'paid' ? (item[field] ? 'Sí' : 'No') :
                      field === 'total' ? (item.price_unit * item.quantity_sell) :
                      field ===  'products_id' ? product && product.label :
                      item[field];

        const isEditable = actionButton.action === 'update' && actionButton.actionDataId === item.sell_product_id;

        return (
            <span
                ref={isEditing ? editableRef : null}
                className={`editable-cell ${isEditing && isEditable ? 'editing' : ''}`}
                contentEditable={isEditable && isEditing}
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
    }, [editingCell, actionButton, handleKeyDown, handleStartEditing, handleCellChange, filterProductsTag]);

    const handleOnclickSubmit = useCallback((event) => {
        const action = event.currentTarget.getAttribute('action');

        if (action === 'save') {
            handleUserStateChange(newState, 'update');
            openConfirmation();
            setActionButton({ action: null, actionDataId: null });
        }

        if (action === 'cancelar') {
            setActionButton({ action: null, actionDataId: null });
            setTableData(data);
        }
    }, [newState, handleUserStateChange, openConfirmation, data]);

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
                        <th>Producto</th>
                        <th>
                            <button onClick={() => handleOpenModal(true)}>
                                <i className="fa fa-plus" aria-hidden="true" /> 
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => (
                        <tr
                            key={item.sell_product_id || index}
                            className={actionButton.action === 'update' && actionButton.actionDataId === item.sell_product_id ? 'data-selected' : ''}
                        >
                            {['date_sell', 'paid', 'payment_method', 'price_unit', 'quantity_sell', 'total', 'products_id'].map(field => (
                                <td key={field}>{renderCell(item, index, field)}</td>
                            ))}
                            <td>
                                {actionButton.action === 'update' && actionButton.actionDataId === item.sell_product_id ? (
                                    <>
                                        <button onClick={handleOnclickSubmit} action="save">
                                            <i className="fas fa-save" aria-hidden="true" />
                                        </button>
                                        <button onClick={handleOnclickSubmit} action="cancelar">
                                            <i className="fas fa-times" aria-hidden="true" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setActionButton({ action: 'update', actionDataId: item.sell_product_id })}>
                                            <i className="fa fa-pencil" aria-hidden="true" />
                                        </button>
                                        <button onClick={() => setActionButton({ action: 'delete', actionDataId: item.sell_product_id })}>
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
