const login = async (user_form) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Cambiar el tipo de contenido
            },
            body: new URLSearchParams(user_form), // Usar URLSearchParams para formatear los datos
            mode: 'cors',
        });

        if (!response.ok) {
            // ... (Manejo de errores - sin cambios)
            const errorData = await response.json(); // Intenta obtener detalles del error del backend
            throw new Error(errorData.message || 'Error en los datos de inicio de sesión');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // console.error('Error en la solicitud de login:', error);
        return 'error';
    }
};

export default login;