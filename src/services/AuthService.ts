// src/services/auth/IAuthService.ts
import { type User } from "../models/User";

export interface AuthService {
    signInWithGithub(): Promise<User | null>;
    signOut(): Promise<void>;
    getCurrentUser(): User | null;
}
