
const update_sell = async (userData) => {
    const { access_token, token_type, user_id } = userData.user_true;
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    // const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';

    console.log(userData)
    try {
        const response = await fetch(`${apiUrl}/sell_products/update_sell_product/${user_id}/${userData.values.sell_product_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(userData.values)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la actualización de ventas');
        }

        const data = await response.json();
        console.log(data)
        return {
            status: response.status,
            dataTrue: data,
        };

    } catch (error) {
        console.error('Error en la solicitud de actualización de ventas:', error);
        return 'error';
    }
}

export default update_sell;