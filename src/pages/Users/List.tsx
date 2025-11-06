import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userService } from "../../services/userService";
import type { User } from "../../models/User";
import GenericTable from "../../components/GenericTable";

const ListUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [tableStyle, setTableStyle] = useState<"material" | "bootstrap" | "tailwind">("bootstrap");
    const navigate = useNavigate();

    const loadUsers = async () => {
        try {
        const data = await userService.getAll();
        setUsers(data);
        } catch {
        Swal.fire("Error", "No se pudo cargar la lista de usuarios", "error");
        }
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        const confirm = await Swal.fire({
        title: "¿Eliminar usuario?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        });
        if (confirm.isConfirmed) {
        await userService.remove(id);
        loadUsers();
        Swal.fire("Eliminado", "Usuario eliminado con éxito", "success");
        }
    };

    const handleAction = (actionName: string, user: User) => {
        switch (actionName) {
        case "edit":
            navigate(`/user/update/${user.id}`);
            break;
        case "delete":
            handleDelete(user.id);
            break;
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const columns = ["id", "name", "email"];
    const actions = [
        { name: "edit", label: "Editar", color: "secondary" as const },
        { name: "delete", label: "Eliminar", color: "error" as const },
    ];

    return (
        <div className="container mt-4">
        <h2 className="text-success text-center mb-4">Lista de Usuarios</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/user/create" className="btn btn-success">
            + Nuevo Usuario
            </Link>

            {/* Selector de estilo de tabla */}
            <select
            className="form-select w-auto"
            value={tableStyle}
            onChange={(e) =>
                setTableStyle(e.target.value as "material" | "bootstrap" | "tailwind")
            }
            >
            <option value="material">Material UI</option>
            <option value="bootstrap">Bootstrap</option>
            <option value="tailwind">Tailwind</option>
            </select>
        </div>

        <GenericTable
            data={users}
            columns={columns}
            actions={actions}
            onAction={handleAction}
            styleType={tableStyle}
        />
        </div>
    );
};

export default ListUsers;
