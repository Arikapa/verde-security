import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
    const { loginWithGithub, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGithubLogin = async () => {
        setLoading(true);
        try {
            await loginWithGithub();
            Swal.fire({
                title: "Bienvenido",
                text: "Inicio de sesión correcto con GitHub",
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
            });
            navigate("/user/list");
        } catch (error) {
            console.error("Error de inicio de sesión:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo iniciar sesión con GitHub",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    // ✅ redirige después del render, no durante
    useEffect(() => {
        if (user) {
            navigate("/user/list");
        }
    }, [user, navigate]);

    return (
        <div
            className="container d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="card shadow-sm w-100" style={{ maxWidth: 420 }}>
                <div className="card-body">
                    <h3 className="card-title text-center text-success fw-bold mb-3">
                        Sistema de Seguridad
                    </h3>
                    <p className="text-center text-muted mb-4">
                        Inicia sesión con tu cuenta de <strong>GitHub</strong> para continuar.
                    </p>

                    <div className="d-grid gap-3">
                        <button
                            className="btn btn-dark"
                            onClick={handleGithubLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Conectando...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-github me-2"></i> Iniciar sesión con GitHub
                                </>
                            )}
                        </button>

                        <button
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                Swal.fire({
                                    title: "Información",
                                    text: "Tu inicio de sesión se realiza mediante GitHub para mayor seguridad y facilidad de acceso.",
                                    icon: "info",
                                })
                            }
                        >
                            ¿Por qué GitHub?
                        </button>
                    </div>
                </div>

                <div className="card-footer text-center text-muted small">
                    Security App — Parte Verde
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
