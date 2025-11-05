import React, { useEffect, useState } from "react";
import type { Answer } from "../models/Answer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { securityQuestionService } from "../services/SecurityQuestionService";
import { userService } from "../services/userService";
import { type SecurityQuestion } from "../models/SecurityQuestion";
import { type User } from "../models/User";

interface AnswerFormProps {
    mode: number; // 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Answer) => void;
    handleUpdate?: (values: Answer) => void;
    answer?: Answer | null;
}

const AnswerFormValidator: React.FC<AnswerFormProps> = ({ mode, handleCreate, handleUpdate, answer }) => {
    const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [questionsData, usersData] = await Promise.all([
                    securityQuestionService.getSecurityQuestions(),
                    userService.getUsers(),
                ]);
                setSecurityQuestions(questionsData);
                setUsers(usersData);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (formattedValues: Answer) => {
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
                answer
                    ? answer
                        : {
                            id: 0,
                            content: "",
                            questionId: 0,
                            id_client: 0,
                        }
            }
            validationSchema={Yup.object({
                content: Yup.string()
                    .trim()
                    .required("El contenido de la respuesta es obligatorio")
                    .min(2, "La respuesta debe tener al menos 2 caracteres"),
                questionId: Yup.number()
                    .required("Debe seleccionar una pregunta de seguridad")
                    .min(1, "Debe seleccionar una pregunta válida"),
                id_client: Yup.number()
                    .required("Debe seleccionar un usuario")
                    .min(1, "Debe seleccionar un usuario válido"),
            })}
            onSubmit={(values) => {
                const formattedValues: Answer = {
                    ...values,
                    questionId: Number(values.questionId),
                    id_client: Number(values.id_client),
                };
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
                    {/* Campo de contenido */}
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                            Contenido
                        </label>
                        <Field
                            as="textarea"
                            name="content"
                            rows={3}
                            placeholder="Escribe tu respuesta..."
                            className="form-control"
                        />
                        <ErrorMessage name="content">
                            {(msg) => <div className="form-text text-danger">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    {/* Selector de pregunta de seguridad */}
                    <div className="mb-3">
                        <label htmlFor="questionId" className="form-label">
                            Pregunta de Seguridad
                        </label>
                        <Field as="select" name="questionId" className="form-select">
                            <option value={0}>Seleccione una pregunta</option>
                            {securityQuestions.map((q) => (
                                <option key={q.id} value={q.id}>
                                    {q.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="questionId">
                            {(msg) => <div className="form-text text-danger">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    {/* Selector de usuario */}
                    <div className="mb-3">
                        <label htmlFor="id_client" className="form-label">
                            Usuario
                        </label>
                        <Field as="select" name="id_client" className="form-select">
                            <option value={0}>Seleccione un usuario</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name} ({u.email})
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="id_client">
                            {(msg) => <div className="form-text text-danger">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    {/* Botón de enviar */}
                    <button type="submit" className="btn btn-primary">
                        {mode === 1 ? "Crear" : "Actualizar"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AnswerFormValidator;
