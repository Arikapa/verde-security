import axios from 'axios';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/', // usar import.meta.env con Vite
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await auth.currentUser?.getIdToken();
        
        if (token && config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

    api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
            const newToken = await currentUser.getIdToken(true); // forzar refresh
            localStorage.setItem('idToken', newToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return api(originalRequest);
            } else {
            // no hay user -> forzar logout
            await signOut(auth);
            localStorage.removeItem('idToken');
            localStorage.removeItem('githubToken');
            window.location.href = '/login';
            }
        } catch (e) {
            // falla renovar -> logout
            console.error('No se pudo renovar token', e);
            try {
            await signOut(auth);
            } catch {}
            localStorage.removeItem('idToken');
            localStorage.removeItem('githubToken');
            window.location.href = '/login';
        }
        }
        return Promise.reject(error);
    }
);

export default api;