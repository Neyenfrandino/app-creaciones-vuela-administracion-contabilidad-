const get_ventas = async (userData) => {
    const { access_token, token_type, user_id } = userData.user_true;
    console.log(userData.user_true);
    // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';

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

        const data = await response.json(); // Obtén los datos
        console.log(data)
        return {
            status: response.status,
            dataTrue: data,
        };
        
    } catch (error) {
        console.error('Error en la solicitud get de ventas:', error);
        return 'error';
    }
}

export default get_ventas;