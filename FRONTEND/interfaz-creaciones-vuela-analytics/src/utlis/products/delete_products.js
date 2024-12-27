
const delete_products = async (userData) => {
    const {user_true, values} = userData;
    const { user_id, access_token } = user_true;
    
    // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';

    
    try {
        const response = await fetch(`${apiUrl}/products/delete_product/${user_id}/${values}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la eliminación de productos');
        }

        const data = await response.json();        
        return {
            status: response.status,
            dataTrue: data,
        };
        
    } catch (error) {
        console.error('Error en la solicitud de eliminación de productos:', error);
        return 'error';
    }   
}   

export default delete_products;