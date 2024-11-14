
const delete_products = async (userData, product_id) => {
    const { access_token, token_type, user_id } = userData;
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    
    try {
        const response = await fetch(`${apiUrl}/products/delete_product/${user_id}/${product_id}`, {
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
        // console.log(data, 'hola mundo')
        return data;
    } catch (error) {
        console.error('Error en la solicitud de eliminación de productos:', error);
        return 'error';
    }   
}   

export default delete_products;