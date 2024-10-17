import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { useTable } from 'react-table';
import 'chart.js/auto'; // Esto es necesario para que funcione Chart.js

import { ContextQuery } from '../../../context/contexts_query/contexts_query';

const AnalyticsVentas = () => {
    
    const { setkeyQuery } = useContext(ContextQuery);

    const location = useLocation();
    const isAuthPage = location.pathname === '/estadisticas/analytics__ventas';
    console.log(isAuthPage);

    useEffect( () => {
        if (isAuthPage) {
            setkeyQuery('analytics__ventas');
        }
    }, [isAuthPage]);

    // Datos para el gráfico de barras (ventas mensuales)
    const barData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
            {
                label: 'Ventas Mensuales',
                data: [12000, 15000, 14000, 13000, 16000, 17000, 18000],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Datos para el gráfico de torta (productos más vendidos)
    const pieData = {
        labels: ['Producto A', 'Producto B', 'Producto C'],
        datasets: [
            {
                data: [5000, 3000, 2000],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    // Datos para la tabla (detalle de ventas)
    const data = React.useMemo(
        () => [
            { producto: 'Producto A', ventas: 5000, cantidad: 100 },
            { producto: 'Producto B', ventas: 3000, cantidad: 80 },
            { producto: 'Producto C', ventas: 2000, cantidad: 50 },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            { Header: 'Producto', accessor: 'producto' },
            { Header: 'Ventas', accessor: 'ventas' },
            { Header: 'Cantidad Vendida', accessor: 'cantidad' },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <div className="analytics__ventas">
            {/* <h1>Analytics de Ventas</h1> */}
            
            {/* Gráfico de barras - Ventas mensuales */}
            <div className="chart-container">
                <h2>Ventas Mensuales</h2>
                <Bar data={barData} />
            </div>

            {/* Gráfico de torta - Productos más vendidos */}
            {/* <div className="chart-container">
                <h2>Productos Más Vendidos</h2>
                <Pie data={pieData} />
            </div> */}

            {/* Tabla de detalle de ventas */}
            {/* <div className="table-container">
                <h2>Detalle de Ventas</h2>
                <table {...getTableProps()} style={{ border: '1px solid black', width: '100%', marginTop: '20px' }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} style={{ borderBottom: '1px solid black', padding: '10px' }}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid gray' }}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table> */}
            {/* </div> */}
        </div>
    );
}

export default AnalyticsVentas;
