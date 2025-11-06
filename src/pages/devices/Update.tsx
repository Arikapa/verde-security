import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { deviceService } from "../../services/DeviceService";
import { useNavigate } from "react-router-dom";
import DeviceFormValidator from "../../components/DeviceFormValidator";
import type { Device } from "../../models/Device";

const UpdateDevice: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [device, setDevice] = useState<Device | null>(null);

    useEffect(() => {
        if (id) {
        deviceService
            .getById(Number(id))
            .then(setDevice)
            .catch(() => Swal.fire("Error", "No se pudo cargar el dispositivo", "error"));
        }
    }, [id]);

    const handleSubmit = async (values: Device) => {
        try {
            await deviceService.update(Number(id), values);
            Swal.fire("Éxito", "Dispositivo actualizado correctamente", "success");
            setTimeout(() => navigate("/decive/list"), 800);
        } catch {
        Swal.fire("Error", "No se pudo actualizar el dispositivo", "error");
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="text-success mb-4 text-center">Actualizar Dispositivo</h2>
        {device ? (
            <DeviceFormValidator initialValues={device} onSubmit={handleSubmit} />
        ) : (
            <p>Cargando...</p>
        )}
        </div>
    );
};

export default UpdateDevice;
