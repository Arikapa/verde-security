// src/firebaseConfig.tsx
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

// Configuración que te dio Firebase:
const firebaseConfig = {
    apiKey: "AIzaSyBZsgGSBX-dW9POR8MXi6yJhXuzkuRpilI",
    authDomain: "security-app-d3585.firebaseapp.com",
    projectId: "security-app-d3585",
    storageBucket: "security-app-d3585.firebasestorage.app",
    messagingSenderId: "519082297135",
    appId: "1:519082297135:web:a998458ac6f33dafcb83da",
    measurementId: "G-KR0KFJ5P21",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Agregamos autenticación y proveedor de GitHub
export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();

export default app;
