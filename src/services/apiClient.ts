// src/services/apiClient.ts
import axios from "axios";
import FirebaseAuthService from "./FirebaseAuthService";

const apiClient = axios.create({
    // baseURL: import.meta.env.VITE_API_URL, // Unicamente para pruebas locales
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Interceptor de solicitud (request)
apiClient.interceptors.request.use(
    async (config) => {
        const user = FirebaseAuthService.getStoredUser();

        if (user?.firebaseToken) {
        config.headers.Authorization = `Bearer ${user.firebaseToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Interceptor de respuesta (response)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        // Token expirado o sesión inválida
        console.warn("⚠️ Sesión expirada. Cerrando sesión...");
        FirebaseAuthService.signOut();
        window.location.href = "/"; // Redirige al login
        }
        return Promise.reject(error);
    }
);

export default apiClient;
