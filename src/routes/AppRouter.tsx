import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../pages/Authentication/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<SignIn />} />

                {/* Rutas protegidas */}
                <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                    <Dashboard />
                    </PrivateRoute>
                }
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
