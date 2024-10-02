import { Link } from 'react-router-dom';
import './card_admin_data.style.scss';

const CardAdminData = ({dataAdmin, image}) => {
    const { name, email } = dataAdmin;
    
    return (
        <div className="card_admin_data__container">
            <Link to="profile" className="asd">
                <div className="card_admin_data__image">
                    <img src={image} alt="image-admin" />
                </div>

                <div className="card_admin_data__data-admin">
                    <h4>{name}</h4>
                    <span>{email}</span>
                </div>
            </Link>

        </div>
    )
}

export default CardAdminData;