const create_user = async (user_form) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    try {
        const response = await fetch(`${apiUrl}/user/create_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_form),
            mode: 'cors',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la creación del usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud de creación de usuario:', error);
        return 'error';
    }
};

export default create_user;
