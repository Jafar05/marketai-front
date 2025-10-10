import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from '../store/authStore';

interface Props {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
