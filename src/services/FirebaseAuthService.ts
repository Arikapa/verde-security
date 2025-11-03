// src/services/auth/FirebaseAuthService.ts
import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, githubProvider } from "../firebase/config";
import { type User } from "../models/User";
import { type AuthService } from "./AuthService";

export class FirebaseAuthService implements AuthService {
    private currentUser: User | null = null;

    async signInWithGithub(): Promise<User | null> {
        try {
        const result = await signInWithPopup(auth, githubProvider);
        const user = result.user;

        const newUser: User = {
            id: 0,
            name: user.displayName || "",
            email: user.email || "",
            token: await user.getIdToken(),
            is_active: true,
        };

        this.currentUser = newUser;
        return newUser;
        } catch (error) {
            console.error("Error al autenticar con GitHub:", error);
            return null;
        }
    }

    async signOut(): Promise<void> {
        await firebaseSignOut(auth);
        this.currentUser = null;
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}
