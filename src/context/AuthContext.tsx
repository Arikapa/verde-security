// src/context/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import FirebaseAuthService from "../services/FirebaseAuthService";

interface AuthContextProps {
    user: any;
    signInWithGithub: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    signInWithGithub: async () => {},
    logout: async () => {},
    });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = FirebaseAuthService.getStoredUser();
        if (storedUser) setUser(storedUser);
    }, []);

    const signInWithGithub = async () => {
        const userData = await FirebaseAuthService.signInWithGithub();
        setUser(userData);
    };

    const logout = async () => {
        await FirebaseAuthService.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signInWithGithub, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
