
// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const apiUrl = process.env.REACT_APP_API_URL || 'https://app-creaciones-vuela-administracion.onrender.com';


const delete_sell = async (data_user) => {
    const { user_true, values } = data_user
    const { user_id, access_token } = user_true;
    try{
        const response = await fetch(`${apiUrl}/sell_products/delete_sell_product/${user_id}/${values}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la solicitud de eliminación de ventas');
        }
      
        const data = await response.json(); // Obtén los datos

        return {
            status: response.status,
            dataTrue: data,
        };

    }catch(error){
        console.log(error);
    }
}

export default delete_sell;