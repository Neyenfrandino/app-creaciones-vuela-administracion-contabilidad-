const updateUser = async (data_update) => {
    // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';

    const {user_id, access_token} = data_update.user_true;

    try{    
        const response = await fetch(`${apiUrl}/user/update_user/${user_id}`, {
            method : 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(data_update.values)
        })

        const data = await response.json(); // Obtén los datos
        
        return {
            status: response.status,
            dataTrue: data
        };
        
    }catch(error){
        console.log(error);
        return 'error';
    }
}

export default updateUser;