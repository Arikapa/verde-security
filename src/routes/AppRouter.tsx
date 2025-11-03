// src/routes/AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../pages/Authentication/SignIn";

const AppRouter: React.FC = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<SignIn />} />
        </Routes>
        </Router>
    );
};

export default AppRouter;
