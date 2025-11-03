import React from "react";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth, githubProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleGithubLogin = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;
            console.log("Usuario:", user);
            navigate("/");
        } catch (error) {
            console.error("Error en login GitHub:", error);
            alert("Error iniciando sesión con GitHub");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl mb-4">Iniciar sesión</h1>
            <button
                onClick={handleGithubLogin}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
                Iniciar con GitHub
            </button>
        </div>
    );
}
