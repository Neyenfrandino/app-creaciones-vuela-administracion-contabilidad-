
const create_sell = async (userData) => {
    const {user_true, values} = userData
    const { access_token, token_type, user_id } = user_true;
    // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';

    console.log(userData)

    try {
        const response = await fetch(`${apiUrl}/sell_products/create_sell_product/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(values)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la creación de ventas');
        }

        const data = await response.json(); // Obtén los datos

        return {
            status: response.status,
            dataTrue: data,
        };
        
    } catch (error) {
        console.error('Error en la solicitud de creación de ventas:', error);
        return 'error';
    }
}

export default create_sell;