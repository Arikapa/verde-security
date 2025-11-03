// src/components/GithubButton.tsx
import React from "react";

interface GithubButtonProps {
    onClick: () => void;
    }

    const GithubButton: React.FC<GithubButtonProps> = ({ onClick }) => {
    return (
        <button className="github-btn" onClick={onClick}>
        <img src="/github-icon.svg" alt="GitHub" width="24" />
        Iniciar sesión con GitHub
        </button>
    );
};

export default GithubButton;
