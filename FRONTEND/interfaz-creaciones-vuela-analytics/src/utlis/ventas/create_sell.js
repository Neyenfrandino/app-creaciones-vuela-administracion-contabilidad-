
const create_sell = async (userData, newData) => {
    const { access_token, token_type, user_id } = userData;
    // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';


    try {
        const response = await fetch(`${apiUrl}/sell_products/create_sell_product/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(newData)
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

export default create_sell;