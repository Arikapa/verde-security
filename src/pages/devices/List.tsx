import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deviceService } from "../../services/DeviceService";
import type { Device } from "../../models/Device";
import GenericTable from "../../components/GenericTable";

const ListDevices: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [tableStyle, setTableStyle] = useState<"material" | "bootstrap" | "tailwind">("bootstrap");
    const navigate = useNavigate();

    const loadDevices = async () => {
        try {
        const data = await deviceService.getAll();
        setDevices(data);
        } catch {
        Swal.fire("Error", "No se pudo cargar la lista de dispositivos", "error");
        }
    };

    useEffect(() => {
        loadDevices();
    }, []);

    const handleDelete = async (id?: number) => {
        if (!id) return;
        const confirm = await Swal.fire({
        title: "¿Eliminar dispositivo?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        });
        if (confirm.isConfirmed) {
        await deviceService.remove(id);
        loadDevices();
        Swal.fire("Eliminado", "Dispositivo eliminado con éxito", "success");
        }
    };

    const handleAction = (action: string, device: Device) => {
        switch (action) {
        case "edit":
            navigate(`/device/update/${device.id}`);
            break;
        case "delete":
            handleDelete(device.id);
            break;
        }
    };

    const columns = ["id", "name", "ip", "operating_system", "userId"];
    const actions = [
        { name: "edit", label: "Editar", color: "secondary" as const },
        { name: "delete", label: "Eliminar", color: "error" as const },
    ];

    return (
        <div className="container mt-4">
        <h2 className="text-success text-center mb-4">Lista de Dispositivos</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/device/create" className="btn btn-success">
            + Nuevo Dispositivo
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
            data={devices}
            columns={columns}
            actions={actions}
            onAction={handleAction}
            styleType={tableStyle}
        />

        {!devices.length && (
            <p className="text-center mt-3">No hay dispositivos registrados</p>
        )}
        </div>
    );
};

export default ListDevices;
