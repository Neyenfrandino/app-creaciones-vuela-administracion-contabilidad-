// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';


const updateUser = async (data, userTrue) => {
    const {user_id, access_token} = userTrue;

    try{
        const response = await fetch(`${apiUrl}/user/update_user/${user_id}`, {
            method : 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(data)
        })
        
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la creación del usuario');
        }

        const responseData = await response.json();
        console.log(responseData);
        return responseData;
        
    }catch(error){
        console.log(error);
        return 'error';
    }
}

export default updateUser;