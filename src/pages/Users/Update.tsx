import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { userService } from "../../services/userService";
import UserFormValidator from "../../components/UserFormValidator";
import type { User } from "../../models/User";
import { useNavigate } from "react-router-dom";

const UpdateUser: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (id) {
        userService.getById(Number(id)).then(setUser).catch(() => {
            Swal.fire("Error", "No se pudo cargar el usuario", "error");
        });
        }
    }, [id]);

    const handleSubmit = async (values: User) => {
        try {
        await userService.update(Number(id), values);
        Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
        setTimeout(() => navigate("/user/list"), 800);
        } catch {
        Swal.fire("Error", "No se pudo actualizar el usuario", "error");
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="text-success mb-4 text-center">Actualizar Usuario</h2>
        {user ? (
            <UserFormValidator initialValues={user} onSubmit={handleSubmit} />
        ) : (
            <p>Cargando...</p>
        )}
        </div>
    );
    };

export default UpdateUser;
