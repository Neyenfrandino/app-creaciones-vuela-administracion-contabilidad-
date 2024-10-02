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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la creación del usuario');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error en la solicitud de creación de usuario:', error);
        return 'error';
    }
};

export default get_user;
