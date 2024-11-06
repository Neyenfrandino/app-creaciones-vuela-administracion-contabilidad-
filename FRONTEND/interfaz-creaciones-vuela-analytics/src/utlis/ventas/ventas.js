const get_ventas = async (userData) => {
    const { access_token, token_type, user_id } = userData;
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    try {
        const response = await fetch(`${apiUrl}/sell_products/get_all_sell_products/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la creación de ventas');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud de creación de ventas:', error);
        return 'error';
    }
}

export default get_ventas;