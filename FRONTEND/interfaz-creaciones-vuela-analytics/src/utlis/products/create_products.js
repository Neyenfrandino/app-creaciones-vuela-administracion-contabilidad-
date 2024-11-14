
const createProducts = async (data_user, product) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    const { user_id, access_token } = data_user;

    try {
        const response = await fetch(`${apiUrl}/products/create_product/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(product),
            mode: 'cors',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la creación de stock');
        }        

        const data = await response.json();
        console.log(data, 'hola mundo')
        return data;
    } catch (error) {
        console.error('Error en la solicitud de creación de stock:', error);
        return 'error';
    }

}

export default createProducts