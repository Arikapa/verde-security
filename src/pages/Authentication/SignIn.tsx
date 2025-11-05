// src/pages/SignIn/SignIn.tsx

// src/pages/SignIn/SignIn.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { type User } from "../../models/User";
import SecurityService from "../../services/securityService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import GithubButton from "../../components/GithubButton";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { user, signInWithGithub, logout } = useAuth();

  const handleLogin = async (user: User) => {
    try {
      const response = await SecurityService.login(user);
      console.log("Usuario autenticado:", response);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Sign In" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          {/* Imagen lateral */}
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <img
                className="hidden dark:block"
                src={"././images/logo/logo.svg"}
                alt="Logo"
                width={176}
                height={32}
              />
              <img
                className="dark:hidden"
                src={"./images/logo/logo.svg"}
                alt="Logo"
                width={176}
                height={32}
              />
              <p className="2xl:px-20">
                Sistema de seguridad - Proyecto React (GitHub Auth)
              </p>
            </div>
          </div>

          {/* Formulario principal */}
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Bienvenido</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Inicia sesión
              </h2>

              {/* Formulario tradicional */}
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Email inválido")
                    .required("El email es obligatorio"),
                  password: Yup.string().required(
                    "La contraseña es obligatoria"
                  ),
                })}
                onSubmit={(values) => handleLogin(values)}
              >
                {({ handleSubmit }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md"
                  >
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-lg font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="w-full border rounded-md p-2"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-lg font-medium text-gray-700"
                      >
                        Contraseña
                      </label>
                      <Field
                        type="password"
                        name="password"
                        className="w-full border rounded-md p-2"
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* Botón de inicio tradicional */}
                    <button
                      type="submit"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      Iniciar sesión
                    </button>

                    {/* Botón de Google (existente) */}
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                    >
                      <span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L16.7502 17.5568C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                            fill="#4285F4"
                          />
                        </svg>
                      </span>
                      Iniciar con Google
                    </button>

                    {/* 🧩 Nuevo: botón GitHub */}
                    {!user ? (
                      <GithubButton onClick={signInWithGithub} />
                    ) : (
                      <div className="text-center mt-4">
                        <p className="text-gray-700 mb-2">
                          Bienvenido, {user.name}
                        </p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                        <button
                          onClick={logout}
                          className="mt-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;












/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*import React from "react";
import { useAuth } from "../../hooks/useAuth";
import GithubButton from "../../components/GithubButton";

const SignIn: React.FC = () => {
  const { user, signInWithGithub } = useAuth();

  return (
    <div className="signin-container">
      <h1>Autenticación con GitHub</h1>
      {user ? (
        <div>
          <p>Bienvenido, {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => {}}>Cerrar sesión</button>
        </div>
      ) : (
        <GithubButton onClick={signInWithGithub} />
      )}
    </div>
  );
};

export default SignIn;

*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*
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



*/