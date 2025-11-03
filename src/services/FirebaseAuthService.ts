// src/services/FirebaseAuthService.ts
import { signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

class FirebaseAuthService {
    provider = new GithubAuthProvider();

    async signInWithGithub() {
        const result = await signInWithPopup(auth, this.provider);
        const user = result.user;

        const credential = GithubAuthProvider.credentialFromResult(result);
        const githubToken = credential?.accessToken;
        const firebaseToken = await user.getIdToken();

        const userData = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            githubToken,
            firebaseToken,
        };

        // Guardamos en localStorage
        localStorage.setItem("authUser", JSON.stringify(userData));

        return userData;
    }

    async signOut() {
        await signOut(auth);
        localStorage.removeItem("authUser");
    }

    getStoredUser() {
        const data = localStorage.getItem("authUser");
        return data ? JSON.parse(data) : null;
    }
}

export default new FirebaseAuthService();
