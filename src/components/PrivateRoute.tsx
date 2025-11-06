// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}
        >
            <div
            className="spinner-border text-success"
            role="status"
            aria-hidden="true"
            ></div>
        </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
