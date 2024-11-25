import React, { useEffect, useState, useRef, useCallback } from 'react';
import './table.style.scss';

const Table = ({ data, setIsNewData, currentRoute, setOpenModal, filterProductsTag }) => {

  const [editingCell, setEditingCell] = useState({ rowIndex: null, field: null });
  const [actionButton, setActionButton] = useState({ action: '', actionDataId: '' });
  const [tableData, setTableData] = useState(data);
  const [newState, setNewState] = useState({});
  const editableRef = useRef(null);


  const handleStartEditing = useCallback((rowIndex, field) => {
    setEditingCell({ rowIndex, field });
  }, []);

  const handleCellChange = useCallback((index, field) => {
    if (editableRef.current) {
      setTableData(prevData => {
        const updatedData = [...prevData];
        updatedData[index] = {
          ...updatedData[index],
          [field]: editableRef.current.textContent.trim(),
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

  const renderCell = useCallback(
    (item, index, field) => {
      const isEditing = editingCell.rowIndex === index && editingCell.field === field;
  
      // Determinar el valor basado en el campo
      const value = (() => {
        if (field === 'paid') {
          return item[field] ? 'Sí' : 'No';
        }
        if (field === 'total') {
          return item.price_unit * item.quantity_sell;
        }
        if (field === 'products_id') {
          return filterProductsTag.find(tag => tag.value === item[field])?.label || 'Desconocido';
        }
        return item[field];
      })();
  
      // Verificar si la celda es editable
      const isEditable =
        actionButton.action === 'update' && actionButton.actionDataId === item.sell_product_id;
  
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
    },
    [editingCell, actionButton, handleKeyDown, handleStartEditing, handleCellChange, filterProductsTag] // Agregado `filterProductsTag` a las dependencias
  );
  
  useEffect(() => {
    const { action } = actionButton;
    switch (action) {
      case 'delete':
        setIsNewData({
          [currentRoute]: null,
          action: 'delete'
        })
        break;
      case 'save':
        if(newState){
            setIsNewData({
              [currentRoute]: newState,
              action: 'update'
            })
        }
        break;
      case 'cancelar':
        setActionButton({ action: '', actionDataId: '' });
        setTableData(data);
        break;
      default:
        setIsNewData({
          [currentRoute]: null,
          action: 'get'
        })
      
    }
  }, [actionButton, ]);

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
              <button onClick={() => setOpenModal(true)}>
                <i className="fa fa-plus" aria-hidden="true" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr
              key={item.sell_product_id || `row-${index}`}
              className={
                actionButton.action === 'update' &&
                actionButton.actionDataId === item.sell_product_id
                  ? 'data-selected'
                  : ''
              }
            >
              {['date_sell', 'paid', 'payment_method', 'price_unit', 'quantity_sell', 'total', 'products_id'].map(
                field => (
                  <td key={field}>{renderCell(item, index, field)}</td>
                )
              )}
              <td>
                {actionButton.action === 'update' &&
                actionButton.actionDataId === item.sell_product_id ? (
                  <>
                    <button onClick={() => setActionButton({ action: 'save', actionDataId: item.sell_product_id })}>
                      <i className="fas fa-save" aria-hidden="true" />
                    </button>

                    <button onClick={() => setActionButton({ action: 'cancelar', actionDataId: item.sell_product_id })}>
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
