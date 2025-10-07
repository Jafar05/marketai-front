import React from "react";
import {Routes, Route} from "react-router-dom";
// import Login from "../pages/Login.tsx";

// import Dashboard from "../pages/Dashboard.tsx";
// import History from "../pages/History.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Register from "../pages/Register/Register.tsx";
import Main from "../pages/Main/Main.tsx";
import Navbar from "../pages/Navbar/Navbar.tsx";

const AppRoutes = () => {
    return (
            <Routes>
                <Route path="*" element={<Navbar />}/>
                {/* Публичные страницы */}
                <Route path="/" element={<Main />} />
                {/*<Route path="/login" element={<Login />} />*/}
                <Route path="/register" element={<Register />} />

                {/* Приватные страницы (доступны только после авторизации) */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            {/*<Dashboard />*/}
                        </PrivateRoute>
                    }
                />
                {/*<Route*/}
                {/*    path="/history"*/}
                {/*    element={*/}
                {/*        <PrivateRoute>*/}
                {/*            <History />*/}
                {/*        </PrivateRoute>*/}
                {/*    }*/}
                {/*/>*/}

                {/* fallback на главную */}
                <Route path="*" element={<Main />} />
            </Routes>
    );
};

export default AppRoutes;
