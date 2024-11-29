const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';


const delete_user = async (userData) => {
    const { access_token, token_type, user_id } = userData;
  try {
    const response = await fetch(`${apiUrl}/user/delete_user/${user_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el usuario');
      }

      const data = await response.json();
      console.log(data);
      return data;

  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return false;
  }
};

export default delete_user;
  