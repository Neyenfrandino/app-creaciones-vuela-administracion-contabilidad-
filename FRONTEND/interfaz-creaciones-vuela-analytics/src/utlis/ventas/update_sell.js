
const update_sell = async (userData, newData) => {
    const { access_token, token_type, user_id } = userData;
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    try {
        const response = await fetch(`${apiUrl}/sell_products/update_sell_product/${user_id}/${newData.sell_product_id}`, {
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

        return {
            status: response.status,
            data: data
        };
    } catch (error) {
        console.error('Error en la solicitud de actualización de ventas:', error);
        return 'error';
    }
}

export default update_sell;