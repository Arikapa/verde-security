// ...existing code...
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
    const { loginWithGithub } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGithubLogin = async () => {
        setLoading(true);
        setError(null);
        try {
        await loginWithGithub();
        navigate('/');
        } catch (e: any) {
        setError('Error al iniciar sesión con GitHub');
        console.error(e);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div>
        <h1>Iniciar sesión</h1>
        <button onClick={handleGithubLogin} disabled={loading}>
            {loading ? 'Iniciando...' : 'Iniciar con GitHub'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginPage;
// ...existing code...