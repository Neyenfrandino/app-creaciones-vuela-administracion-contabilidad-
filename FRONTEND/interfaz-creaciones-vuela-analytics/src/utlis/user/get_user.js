const get_user = async (user_data) => {
    const {token, user_id} = user_data.user_true;
    // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';
    
    try {
        const response = await fetch(`${apiUrl}/user/read_user/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json(); // Obtén los datos

        return {
            status: response.status,
            dataTrue: data,
        };
    } catch (error) {
        console.error('Error en la solicitud de usuario:', error);
        return 'error';
    }
};

export default get_user;
