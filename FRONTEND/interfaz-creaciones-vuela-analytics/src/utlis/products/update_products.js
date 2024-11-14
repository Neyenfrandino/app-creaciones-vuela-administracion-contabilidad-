
const upodate_products = async (userData, newData) => {
    const { access_token, token_type, user_id } = userData;
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    console.log(userData, 'hola mundo')
    console.log(newData, 'hola mundo')

    try {
        const response = await fetch(`${apiUrl}/products/update_product/${user_id}/${newData.products_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(newData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la actualización de ventas');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud de actualización de ventas:', error);
        return 'error';
    }   
}

export default upodate_products;