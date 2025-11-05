import React from "react";
import type { SecurityQuestion } from "../models/SecurityQuestion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Definimos la interfaz para los props
interface SecurityQuestionFormProps {
    mode: number; // 1 = crear, 2 = actualizar
    handleCreate?: (values: SecurityQuestion) => void;
    handleUpdate?: (values: SecurityQuestion) => void;
    question?: SecurityQuestion | null;
}

const SecurityQuestionFormValidator: React.FC<SecurityQuestionFormProps> = ({
    mode,
    handleCreate,
    handleUpdate,
    question
}) => {

    // Maneja el envío del formulario según el modo
    const handleSubmit = (formattedValues: SecurityQuestion) => {
        if (mode === 1 && handleCreate) {
            handleCreate(formattedValues);  // Crear nueva pregunta
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);  // Actualizar existente
        } else {
            console.error('No function provided for the current mode');
        }
    };

    return (
        <Formik
            // Inicialización de valores
            initialValues={question ? question : {
                id: 0,
                name: "",
                description: "",
            }}

            // Validaciones con Yup
            validationSchema={Yup.object({
                name: Yup.string()
                    .trim()
                    .required("El nombre de la pregunta es obligatorio")
                    .min(3, "Debe tener al menos 3 caracteres")
                    .max(100, "Máximo 100 caracteres"),

                description: Yup.string()
                    .trim()
                    .required("La descripción es obligatoria")
                    .min(5, "Debe tener al menos 5 caracteres")
                    .max(255, "Máximo 255 caracteres"),
            })}

            // Envío del formulario
            onSubmit={(values) => {
                const formattedValues = { ...values };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre de la pregunta</label>
                        <Field
                            type="text"
                            name="name"
                            placeholder="Ej: ¿Cuál es tu color favorito?"
                            className="form-control"
                        />
                        <ErrorMessage name="name">
                            {(msg) => <div className="form-text text-danger">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <Field
                            as="textarea"
                            name="description"
                            rows={3}
                            placeholder="Escribe una breve descripción de la pregunta..."
                            className="form-control"
                        />
                        <ErrorMessage name="description">
                            {(msg) => <div className="form-text text-danger">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Guardando..."
                            : mode === 1
                            ? "Crear Pregunta"
                            : "Actualizar Pregunta"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default SecurityQuestionFormValidator;
