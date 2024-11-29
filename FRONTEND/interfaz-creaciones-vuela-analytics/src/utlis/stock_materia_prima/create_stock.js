const createStock = async (data_user, data_stock) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    // const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';


    const { user_id, access_token } = data_user;

    try {
        const response = await fetch(`${apiUrl}/stock_materia_prima/create_stock_materia_prima/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(data_stock),
            mode: 'cors',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la creación de stock');
        }        

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud de creación de stock:', error);
        return 'error';
    }

}

export default createStock