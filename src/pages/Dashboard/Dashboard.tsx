// src/pages/Dashboard/Dashboard.tsx
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="container mt-5">
        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-success fw-bold">Panel de Control - Seguridad</h1>
            <button className="btn btn-outline-danger" onClick={logout}>
            Cerrar sesión
            </button>
        </div>

        {/* Información del usuario autenticado */}
        <div className="card shadow-sm p-3 mb-4 bg-body-tertiary rounded">
            <div className="card-body text-center">
            {user ? (
                <>
                <img
                    src={user.photo}
                    alt="Foto de usuario"
                    className="rounded-circle mb-3"
                    style={{ width: "100px", height: "100px" }}
                />
                <h4 className="card-title text-success">{user.name}</h4>
                <p className="card-text text-muted">{user.email}</p>
                <p className="badge bg-success">Autenticado con GitHub</p>
                </>
            ) : (
                <p className="text-muted">Cargando información del usuario...</p>
            )}
            </div>
        </div>

        {/* Sección para CRUD (aún vacía) */}
        <div className="card shadow-sm p-3 bg-light rounded">
            <h4 className="mb-3 text-success">Gestión de Entidades (CRUD)</h4>
            <p className="text-muted">
            Aquí podrás crear, listar y actualizar entidades relacionadas con el sistema
            de seguridad. <br />
            Próximamente: operaciones 1:1, 1:N y N:N.
            </p>

            <div className="d-flex gap-3">
            <button className="btn btn-success">Crear nuevo</button>
            <button className="btn btn-outline-success">Listar</button>
            <button className="btn btn-outline-secondary">Actualizar</button>
            <button className="btn btn-outline-danger">Eliminar</button>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
