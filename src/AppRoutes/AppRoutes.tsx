import React from "react";
import {Routes, Route} from "react-router-dom";
import Register from "../pages/Register/Register.tsx";
import Login from "../pages/Login/Login.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import History from "../pages/History/History.tsx";
import Navbar from "../pages/Navbar/Navbar.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

const AppRoutes: React.FC = () => {
    return (
            <Routes>
                {/* Публичные страницы */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Приватные страницы с навигацией */}
                <Route path="/" element={<Navbar />}>
                    <Route index element={<Login />} />
                    <Route
                        path="dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="history"
                        element={
                            <PrivateRoute>
                                <History />
                            </PrivateRoute>
                        }
                    />
                </Route>

                {/* fallback на логин */}
                <Route path="*" element={<Login />} />
            </Routes>
    );
};

export default AppRoutes;
