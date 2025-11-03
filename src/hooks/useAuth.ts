// src/hooks/useAuth.ts
import { useState } from "react";
import { FirebaseAuthService } from "../services/FirebaseAuthService";
import { type User } from "../models/User";

const authService = new FirebaseAuthService();

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(authService.getCurrentUser());

    const signInWithGithub = async () => {
        const loggedUser = await authService.signInWithGithub();
        setUser(loggedUser);
    };

    const signOut = async () => {
        await authService.signOut();
        setUser(null);
    };

    return { user, signInWithGithub, signOut };
};
