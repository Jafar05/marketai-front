import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const isAuth = localStorage.getItem("token"); // позже заменишь на глобальный стейт / context
    return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
