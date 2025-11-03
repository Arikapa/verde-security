// src/App.tsx
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

const AuthButtons = () => {
  const { user, signInWithGithub, logout } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      {user ? (
        <>
          <img src={user.photo} alt="User" style={{ borderRadius: "50%", width: "100px" }} />
          <h2>Bienvenido {user.name}</h2>
          <p>{user.email}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <button onClick={signInWithGithub}>Iniciar sesión con GitHub</button>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthButtons />
    </AuthProvider>
  );
}

export default App;
