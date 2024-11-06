const create_user = async (user_form) => {

    const userData = {
        name: user_form.name,     // Primero el nombre
        email: user_form.email,   // Luego el email
        password: user_form.password // Finalmente la contraseña
    };
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    try {
        const response = await fetch(`${apiUrl}/user/create_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            mode: 'cors',
        });
        console.log(response.ok, 'status response ');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la creación del usuario');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        return ;
    }
};

export default create_user;
