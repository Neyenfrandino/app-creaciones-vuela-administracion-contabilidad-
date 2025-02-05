
const get_products = async (userData) => {
    const {user_true, values} = userData;
    const { access_token, token_type, user_id } = user_true;
    console.log(userData.user_true);
    // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';


    try {
        const response = await fetch(`${apiUrl}/products/read_products_all/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la solicitud de productos');
        }

        const data = await response.json();
        return {
            status: response.status,
            dataTrue: data,
        };

    }catch(error){
        return ;
    }

}

export default get_products