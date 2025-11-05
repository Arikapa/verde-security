import React from "react";
import type { Device } from "../models/Device";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface DeviceFormProps {
    mode: number; // 1 = crear, 2 = actualizar
    handleCreate?: (values: Device) => void;
    handleUpdate?: (values: Device) => void;
    device?: Device | null;
}

const DeviceFormValidator: React.FC<DeviceFormProps> = ({
    mode,
    handleCreate,
    handleUpdate,
    device,
    }) => {
    // Función para manejar el envío del formulario
    const handleSubmit = (values: Device) => {
        if (mode === 1 && handleCreate) {
        handleCreate(values);
        } else if (mode === 2 && handleUpdate) {
        handleUpdate(values);
        } else {
        console.error("Modo inválido o función no definida");
        }
    };

    return (
        <Formik
        initialValues={
            device ?? {
            id: 0,
            name: "",
            ip: "",
            operating_system: "",
            }
        }
        validationSchema={Yup.object({
            name: Yup.string().required("El nombre del dispositivo es obligatorio").max(50, "Máximo 50 caracteres"),
            ip: Yup.string().required("La dirección IP es obligatoria")
            .matches(
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                "Debe ser una dirección IP válida (por ejemplo: 192.168.0.1)"
            ),
            operating_system: Yup.string().required("El sistema operativo es obligatorio").max(50, "Máximo 50 caracteres"),
        })}

        onSubmit={handleSubmit}
        >
        {({ isSubmitting }) => (
            <Form className="p-4 bg-white rounded shadow-sm">
            <div className="card p-3 border-0">
                <h5 className="card-title mb-3">
                {mode === 1
                    ? "Registrar nuevo dispositivo"
                    : "Actualizar dispositivo"}
                </h5>

                {/* Nombre */}
                <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre del dispositivo</label>
                <Field name="name" type="text" className="form-control" placeholder="Ej: Servidor principal"/>
                <ErrorMessage name="name">{(msg) => <div className="form-text text-danger">{msg}</div>}</ErrorMessage>
                </div>

                {/* IP */}
                <div className="mb-3">
                <label htmlFor="ip" className="form-label">Dirección IP</label>
                <Field name="ip" type="text" className="form-control" placeholder="Ej: 192.168.1.10"/>
                <ErrorMessage name="ip">{(msg) => <div className="form-text text-danger">{msg}</div>}</ErrorMessage>
                </div>

                {/* Sistema operativo */}
                <div className="mb-3">
                <label htmlFor="operating_system" className="form-label">Sistema operativo</label>
                <Field name="operating_system" type="text" className="form-control" placeholder="Ej: Windows Server 2022, Ubuntu 24.04"/>
                <ErrorMessage name="operating_system">{(msg) => <div className="form-text text-danger">{msg}</div>}</ErrorMessage>
                </div>

                {/* Botón de enviar */}
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                >
                    {isSubmitting? "Guardando...": mode === 1? "Registrar Dispositivo": "Actualizar Dispositivo"}
                </button>
            </div>
            </Form>
        )}
        </Formik>
    );
};

export default DeviceFormValidator;
