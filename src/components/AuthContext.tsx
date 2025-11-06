import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GithubAuthProvider,
    onAuthStateChanged,
    signOut,
    type User as FirebaseUser,
} from "firebase/auth";

// --- Configuración Firebase (tuya)
const firebaseConfig = {
    apiKey: "AIzaSyBZsgGSBX-dW9POR8MXi6yJhXuzkuRpilI",
    authDomain: "security-app-d3585.firebaseapp.com",
    projectId: "security-app-d3585",
    storageBucket: "security-app-d3585.firebasestorage.app",
    messagingSenderId: "519082297135",
    appId: "1:519082297135:web:a998458ac6f33dafcb83da",
    measurementId: "G-KR0KFJ5P21",
};

// Inicializar app (protegido para no reinicializar varias veces)
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Tipos
type AuthUser = {
    uid: string;
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
    token?: string | null;
    } | null;

type AuthContextType = {
    user: AuthUser;
    loading: boolean;
    loginWithGithub: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
    };

    export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
        if (!fbUser) {
            setUser(null);
            setLoading(false);
            return;
        }

        // Obtener token (si lo necesitas para tu backend)
        const token = await fbUser.getIdToken();

        setUser({
            uid: fbUser.uid,
            displayName: fbUser.displayName,
            email: fbUser.email,
            photoURL: fbUser.photoURL,
            token,
        });
        setLoading(false);
        });

        return () => unsub();
    }, []);

    const loginWithGithub = async () => {
        setLoading(true);
        try {
        const provider = new GithubAuthProvider();
        await signInWithPopup(auth, provider);
        } catch (err) {
        setLoading(false);
        throw err;
        } finally {
        setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
        await signOut(auth);
        setUser(null);
        } finally {
        setLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        loginWithGithub,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
