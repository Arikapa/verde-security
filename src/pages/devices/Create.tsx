import React from "react";
import Swal from "sweetalert2";
import { deviceService } from "../../services/DeviceService";
import DeviceFormValidator from "../../components/DeviceFormValidator";
import { useNavigate } from "react-router-dom";
import type { Device } from "../../models/Device";

const CreateDevice: React.FC = () => {
    const navigate = useNavigate();
    const initialValues: Device = {
        name: "",
        ip: "",
        operating_system: "",
        userId: undefined,
    };

    const handleSubmit = async (values: Device) => {
        try {
        await deviceService.create(values);
            Swal.fire("Éxito", "Dispositivo creado correctamente", "success");
            setTimeout(() => navigate("/decive/list"), 800);
        } catch (error: any) {
            console.error("❌ Error al crear dispositivo:", error);
            Swal.fire("Error", error.response?.data?.message || "No se pudo crear el dispositivo", "error");
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="text-success mb-4 text-center">Registrar Dispositivo</h2>
        <DeviceFormValidator initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateDevice;
