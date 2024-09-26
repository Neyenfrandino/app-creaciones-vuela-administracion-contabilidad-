import SuperUserBento from '../../components/super_user_bento/super_user_bento.component';
import Modal from '../../components/modal/modal.component';
import './super_user.scss';

const object_data_descriptions = [
    {
      section_title: 'Gestión de Usuarios',
      update_user: 'Modificar usuario',
      get_users: 'Obtener lista de usuarios',
      delete_user: 'Eliminar usuario',
    },
    {
      section_title: 'Gestión de Productos',
      create_product: 'Crear producto',
      get_products: 'Ver productos disponibles',
      update_product: 'Modificar producto',
      delete_product: 'Eliminar producto',
    },
    {
      section_title: 'Gestión de Ventas de Productos',
      create_sell_product: 'Registrar venta de producto',
      get_sell_products: 'Ver ventas de productos',
      update_sell_product: 'Modificar venta de producto',
      delete_sell_product: 'Eliminar registro de venta',
    },
    {
      section_title: 'Gestión de Categorías de Productos',
      create_categoryof_product: 'Crear categoría de producto',
      get_categoryof_products: 'Ver categorías de productos',
      update_categoryof_product: 'Modificar categoría de producto',
      delete_categoryof_product: 'Eliminar categoría de producto',
    },
    {
      section_title: 'Gestión de Costos de Producción',
      create_cost_production: 'Registrar costo de producción',
      get_all_cost_productions: 'Ver todos los costos de producción',
      update_cost_production: 'Modificar costo de producción',
      delete_cost_production: 'Eliminar costo de producción',
    },
    {
      section_title: 'Gestión de Stock de Materia Prima',
      create_stock_materia_prima: 'Registrar stock de materia prima',
      get_stock_materia_prima: 'Ver stock de materia prima',
      update_stock_materia_prima: 'Actualizar stock de materia prima',
      delete_stock_materia_prima: 'Eliminar stock de materia prima',
    },
    {
      section_title: 'Gestión de Materiales de Producto',
      create_product_material: 'Registrar material de producto',
      get_product_material: 'Ver material de producto',
      update_product_material: 'Actualizar material de producto',
      delete_product_material: 'Eliminar material de producto',
    },
    {
      section_title: 'Análisis de Ventas',
      get_sell_total_X_products: 'Ver ventas totales por producto',
      get_total_sell_revenue: 'Ver ingresos totales por ventas',
      trend_analysis: 'Análisis de tendencias',
      get_trends_analytics_month: 'Ver tendencias de ventas del mes',
    },
    {
      section_title: 'Análisis de Costos',
      profit_margin_analytics: 'Análisis de margen de beneficio',
    }
  ];
  

const SuperUserRouters = () => {

    return (
        <div>
            <SuperUserBento object_data={object_data_descriptions} />
        </div>    
    )
}

export default SuperUserRouters;