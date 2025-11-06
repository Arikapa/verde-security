import React from "react";
import Swal from "sweetalert2";
import { userService } from "../../services/userService";
import UserFormValidator from "../../components/UserFormValidator";
import { useNavigate } from "react-router-dom";
import type { User } from "../../models/User";

const CreateUser: React.FC = () => {
    const navigate = useNavigate();
    const initialValues: User = {
        name: "",
        email: "",
        password: "",
        age: 0,
        city: "",
        phone: "",
    };

    const handleSubmit = async (values: User) => {
        try {
        await userService.create(values);
        Swal.fire("Éxito", "Usuario creado correctamente", "success");
        setTimeout(() => navigate("/user/list"), 800);
        } catch (error) {
        Swal.fire("Error", "No se pudo crear el usuario", "error");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-success mb-4 text-center">Registrar Usuario</h2>
            <UserFormValidator initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateUser;
