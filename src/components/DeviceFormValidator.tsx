import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Device } from "../models/Device";
import type { User } from "../models/User";
import { userService } from "../services/userService";

interface Props {
    initialValues: Device;
    onSubmit: (values: Device) => void;
}

const DeviceFormValidator: React.FC<Props> = ({ initialValues, onSubmit }) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        userService.getAll().then(setUsers).catch(() => setUsers([]));
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre del dispositivo es obligatorio"),
        ip: Yup.string().required("La IP es obligatoria"),
        operating_system: Yup.string().required("El sistema operativo es obligatorio"),
        userId: Yup.number().required("Debe seleccionar un usuario"),
    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
            <Form className="p-3 border rounded bg-light shadow-sm">
            <div className="mb-3">
                <label className="form-label">Nombre del dispositivo</label>
                <Field name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
                <label className="form-label">Dirección IP</label>
                <Field name="ip" className="form-control" />
                <ErrorMessage name="ip" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
                <label className="form-label">Sistema Operativo</label>
                <Field name="operating_system" className="form-control" />
                <ErrorMessage name="operating_system" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
                <label className="form-label">Usuario</label>
                <Field as="select" name="userId" className="form-select">
                <option value="">Seleccione un usuario</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                    {u.name} ({u.email})
                    </option>
                ))}
                </Field>
                <ErrorMessage name="userId" component="div" className="text-danger" />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-success w-100">
                Guardar Dispositivo
            </button>
            </Form>
        )}
        </Formik>
    );
};

export default DeviceFormValidator;
