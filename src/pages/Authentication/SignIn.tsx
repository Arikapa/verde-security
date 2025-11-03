// src/pages/SignIn/SignIn.tsx
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import GithubButton from "../../components/GithubButton";

const SignIn: React.FC = () => {
  const { user, signInWithGithub, signOut } = useAuth();

  return (
    <div className="signin-container">
      <h1>Autenticación con GitHub</h1>
      {user ? (
        <div>
          <p>Bienvenido, {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={signOut}>Cerrar sesión</button>
        </div>
      ) : (
        <GithubButton onClick={signInWithGithub} />
      )}
    </div>
  );
};

export default SignIn;
