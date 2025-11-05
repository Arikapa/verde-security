import React from "react";
import type { User } from "../models/User";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

// Props del componente
interface MyFormProps {
    mode: number; // 1 = crear, 2 = actualizar
    handleCreate?: (values: User) => void;
    handleUpdate?: (values: User) => void;
    user?: User | null;
}

const UserFormValidator: React.FC<MyFormProps> = ({
    mode,
    handleCreate,
    handleUpdate,
    user,
    }) => {
    const handleSubmit = (formattedValues: User) => {
        if (mode === 1 && handleCreate) {
        handleCreate(formattedValues);
        } else if (mode === 2 && handleUpdate) {
        handleUpdate(formattedValues);
        } else {
        console.error("No function provided for the current mode");
        }
    };

    return (
        <Formik
        initialValues={
            user || {
            name: "",
            email: "",
            password: "",
            age: "",
            city: "",
            phone: "",
            is_active: false,
            digitalSignature: { photo: "" },
            devices: [{ name: "", ip: "", operating_system: "" }],
            answers: [{ content: "", questionId: 0 }],
            }
        }
        validationSchema={Yup.object({
            name: Yup.string().required("El nombre es obligatorio"),
            email: Yup.string()
            .email("Email inválido")
            .required("El email es obligatorio"),
            password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("La contraseña es obligatoria"),
            age: Yup.number()
            .typeError("Debe ser un número")
            .positive("Debe ser positivo")
            .integer("Debe ser un número entero")
            .required("La edad es obligatoria"),
            city: Yup.string().required("La ciudad es obligatoria"),
            phone: Yup.string()
            .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
            .required("El teléfono es obligatorio"),
            digitalSignature: Yup.object({
            photo: Yup.string().required("Debe subir la firma digital"),
            }),
            devices: Yup.array().of(
            Yup.object({
                name: Yup.string().required("El nombre del dispositivo es obligatorio"),
                ip: Yup.string()
                .matches(
                    /^(?:\d{1,3}\.){3}\d{1,3}$/,
                    "Debe ser una IP válida (ejemplo: 192.168.1.1)"
                )
                .required("La IP es obligatoria"),
                operating_system: Yup.string().required("El sistema operativo es obligatorio"),
            })
            ),
            answers: Yup.array().of(
            Yup.object({
                content: Yup.string().required("La respuesta es obligatoria"),
                questionId: Yup.number()
                .positive("Debe seleccionar una pregunta válida")
                .required("Debe seleccionar una pregunta"),
            })
            ),
        })}
        onSubmit={(values) => {
            const formattedValues = { ...values, age: Number(values.age) };
            handleSubmit(formattedValues);
        }}
        >
        {({ handleSubmit, values }) => (
            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h4 className="mb-3 text-center">
                {mode === 1 ? "Crear Usuario" : "Actualizar Usuario"}
            </h4>

            {/* Nombre */}
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger small" />
            </div>

            {/* Email */}
            <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger small" />
            </div>

            {/* Contraseña */}
            <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger small" />
            </div>

            {/* Edad */}
            <div className="mb-3">
                <label className="form-label">Edad</label>
                <Field type="number" name="age" className="form-control" />
                <ErrorMessage name="age" component="div" className="text-danger small" />
            </div>

            {/* Ciudad */}
            <div className="mb-3">
                <label className="form-label">Ciudad</label>
                <Field type="text" name="city" className="form-control" />
                <ErrorMessage name="city" component="div" className="text-danger small" />
            </div>

            {/* Teléfono */}
            <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <Field type="text" name="phone" className="form-control" />
                <ErrorMessage name="phone" component="div" className="text-danger small" />
            </div>

            {/* Activo */}
            <div className="form-check mb-3">
                <Field type="checkbox" name="is_active" className="form-check-input" id="activeCheck" />
                <label htmlFor="activeCheck" className="form-check-label">
                Usuario activo
                </label>
            </div>

            {/* Firma digital (1:1) */}
            <div className="mb-3">
                <label className="form-label">Firma Digital (URL o base64)</label>
                <Field type="text" name="digitalSignature.photo" className="form-control" />
                <ErrorMessage
                name="digitalSignature.photo"
                component="div"
                className="text-danger small"
                />
            </div>

            {/* Dispositivos (1:N) */}
            <FieldArray name="devices">
                {({ push, remove }) => (
                <div className="mb-3">
                    <label className="form-label">Dispositivos</label>
                    {values.devices?.map((_, index) => (
                    <div key={index} className="border p-3 mb-2 rounded">
                        <Field name={`devices.${index}.name`} placeholder="Nombre" className="form-control mb-1" />
                        <ErrorMessage name={`devices.${index}.name`} component="div" className="text-danger small" />

                        <Field name={`devices.${index}.ip`} placeholder="IP" className="form-control mb-1" />
                        <ErrorMessage name={`devices.${index}.ip`} component="div" className="text-danger small" />

                        <Field name={`devices.${index}.operating_system`} placeholder="Sistema operativo" className="form-control mb-1" />
                        <ErrorMessage name={`devices.${index}.operating_system`} component="div" className="text-danger small" />

                        <button type="button" className="btn btn-sm btn-danger mt-2" onClick={() => remove(index)}>
                        Eliminar dispositivo
                        </button>
                    </div>
                    ))}
                    <button type="button" className="btn btn-sm btn-secondary" onClick={() => push({ name: "", ip: "", operating_system: "" })}>
                    + Agregar dispositivo
                    </button>
                </div>
                )}
            </FieldArray>

            {/* Respuestas (N:N) */}
            <FieldArray name="answers">
                {({ push, remove }) => (
                <div className="mb-3">
                    <label className="form-label">Respuestas de Seguridad</label>
                    {values.answers?.map((_, index) => (
                    <div key={index} className="border p-3 mb-2 rounded">
                        <Field name={`answers.${index}.questionId`} type="number" placeholder="ID Pregunta" className="form-control mb-1" />
                        <ErrorMessage name={`answers.${index}.questionId`} component="div" className="text-danger small" />

                        <Field name={`answers.${index}.content`} placeholder="Respuesta" className="form-control mb-1" />
                        <ErrorMessage name={`answers.${index}.content`} component="div" className="text-danger small" />

                        <button type="button" className="btn btn-sm btn-danger mt-2" onClick={() => remove(index)}>
                        Eliminar respuesta
                        </button>
                    </div>
                    ))}
                    <button type="button" className="btn btn-sm btn-secondary" onClick={() => push({ content: "", questionId: 0 })}>
                    + Agregar respuesta
                    </button>
                </div>
                )}
            </FieldArray>

            {/* Botón enviar */}
            <button type="submit" className="btn btn-success w-100">
                {mode === 1 ? "Crear Usuario" : "Actualizar Usuario"}
            </button>
            </Form>
        )}
        </Formik>
    );
};

export default UserFormValidator;
