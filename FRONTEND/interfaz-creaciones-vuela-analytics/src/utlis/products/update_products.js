
const upodate_products = async (userData) => {
    const { user_true, values } = userData;
    const { access_token, token_type, user_id } = user_true;
    
    // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';

    console.log(userData)
    try {
        const response = await fetch(`${apiUrl}/products/update_product/${user_id}/${values.products_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(values)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la actualización de ventas');
        }

        const data = await response.json();
        return {
            status: response.status,
            dataTrue: data,
        };

    } catch (error) {
        console.error('Error en la solicitud de actualización de ventas:', error);
        return 'error';
    }   
}

export default upodate_products;