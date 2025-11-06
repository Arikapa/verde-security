// src/routes/AppRoutes.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import SideBar from "../components/SideBar";
import Breadcrumb from "../components/Breadcrumb";
import { useAuth } from "../context/AuthContext";

// Lazy imports
const LoginPage = lazy(() => import("../pages/LoginPage"));

// User
const UserList = lazy(() => import("../pages/Users/List"));
const UserCreate = lazy(() => import("../pages/Users/Create"));
const UserUpdate = lazy(() => import("../pages/Users/Update"));

// Device
const DeviceList = lazy(() => import("../pages/devices/List"));
const DeviceCreate = lazy(() => import("../pages/devices/Create"));
const DeviceUpdate = lazy(() => import("../pages/devices/Update"));

// DigitalSignature
const SignatureList = lazy(() => import("../pages/digitalSignature/List"));
const SignatureCreate = lazy(() => import("../pages/digitalSignature/Create"));
const SignatureUpdate = lazy(() => import("../pages/digitalSignature/Update"));

// SecurityQuestion
const QuestionList = lazy(() => import("../pages/securityQuestions/List"));
const QuestionCreate = lazy(() => import("../pages/securityQuestions/Create"));
const QuestionUpdate = lazy(() => import("../pages/securityQuestions/Update"));

// Answer
const AnswerList = lazy(() => import("../pages/answer/List"));
const AnswerCreate = lazy(() => import("../pages/answer/Create"));
const AnswerUpdate = lazy(() => import("../pages/answer/Update"));

const AppRoutes: React.FC = () => {
    const { user } = useAuth();

    return (
        <Suspense fallback={<div className="p-4">Cargando...</div>}>
        <Routes>
            {/* 🔹 LOGIN */}
            <Route path="/login" element={<LoginPage />} />

            {/* 🔒 RUTAS PRIVADAS */}
            {user && (
            <>
                {/* 🟩 USERS */}
                <Route
                path="/user/list"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <UserList />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
                <Route
                path="/user/create"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <UserCreate />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
                <Route
                path="/user/update/:id"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <UserUpdate />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />

                {/* 🟩 DEVICES */}
                <Route
                path="/device/list"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <DeviceList />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
                <Route
                path="/device/create"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <DeviceCreate />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
                <Route
                path="/device/update/:id"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <DeviceUpdate />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />

                {/* 🟩 DIGITAL SIGNATURES */}
                <Route
                path="/digitalSignature/list"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <SignatureList />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
                <Route
                path="/digitalSignature/create"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <SignatureCreate />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
                <Route
                path="/digitalSignature/update/:id"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <SignatureUpdate />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />

                {/* 🟩 SECURITY QUESTIONS */}
                <Route
                path="/securityQuestion/list"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <QuestionList />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
                <Route
                path="/securityQuestion/create"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <QuestionCreate />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
                <Route
                path="/securityQuestion/update/:id"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <QuestionUpdate />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />

                {/* 🟩 ANSWERS */}
                <Route
                path="/answer/list"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <AnswerList />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
                <Route
                path="/answer/create"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <AnswerCreate />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
                <Route
                path="/answer/update/:id"
                element={
                    <PrivateRoute>
                    <div className="d-flex w-100">
                        <SideBar />
                        <main className="flex-fill p-4">
                        <Breadcrumb />
                        <AnswerUpdate />
                        </main>
                    </div>
                    </PrivateRoute>
                }
                />
            </>
            )}

            {/* 🔹 DEFAULT REDIRECT */}
            <Route path="*" element={<Navigate to={user ? "/user/list" : "/login"} />} />
        </Routes>
        </Suspense>
    );
};

export default AppRoutes;
