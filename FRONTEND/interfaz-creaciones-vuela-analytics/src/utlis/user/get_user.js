const get_user = async (user_data) => {
    const {token, user_id} = user_data;
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    try {
        const response = await fetch(`${apiUrl}/user/read_user/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json(); // Obtén los datos

        // Devuelve tanto el estado como los datos
        return {
            status: response.status,
            data: data
        };
    } catch (error) {
        console.error('Error en la solicitud de usuario:', error);
        return {
            status: 'error',
            data: null
        };
    }
};

export default get_user;
