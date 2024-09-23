import { Routes, Route } from "react-router-dom";
import Login from "../../components/login/login.component";
import RegisterUser from "../../components/register_user/register_user.component";

import './auth.style.scss';
const AuthRouters = () => {
    return (
        <div className="auth__container">
            <div className="content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterUser />} />
                </Routes>
            </div>
        </div>
    )
}

export default AuthRouters;