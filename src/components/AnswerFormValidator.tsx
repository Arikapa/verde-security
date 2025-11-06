import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Answer } from "../models/Answer";
import type { SecurityQuestion } from "../models/SecurityQuestion";
import type { User } from "../models/User";
import { securityQuestionService } from "../services/SecurityQuestionService";
import { userService } from "../services/userService";

interface Props {
    initialValues: Answer;
    onSubmit: (values: Answer) => void;
    }

    const AnswerFormValidator: React.FC<Props> = ({ initialValues, onSubmit }) => {
    const [questions, setQuestions] = useState<SecurityQuestion[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        securityQuestionService.getAll().then(setQuestions).catch(() => setQuestions([]));
        userService.getAll().then(setUsers).catch(() => setUsers([]));
    }, []);

    const validationSchema = Yup.object({
        content: Yup.string().required("La respuesta no puede estar vacía"),
        questionId: Yup.number().required("Seleccione una pregunta válida"),
        userId: Yup.number().required("Seleccione un usuario"),
    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
            <Form className="p-3 border rounded bg-light shadow-sm">
            <div className="mb-3">
                <label className="form-label">Pregunta de Seguridad</label>
                <Field as="select" name="questionId" className="form-select">
                <option value="">Seleccione una pregunta</option>
                {questions.map((q) => (
                    <option key={q.id} value={q.id}>
                    {q.name}
                    </option>
                ))}
                </Field>
                <ErrorMessage name="questionId" component="div" className="text-danger" />
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

            <div className="mb-3">
                <label className="form-label">Respuesta</label>
                <Field as="textarea" name="content" className="form-control" rows={2} />
                <ErrorMessage name="content" component="div" className="text-danger" />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-success w-100 mt-3">
                Guardar Respuesta
            </button>
            </Form>
        )}
        </Formik>
    );
};

export default AnswerFormValidator;
