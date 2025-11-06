import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { SecurityQuestion } from "../models/SecurityQuestion";

interface Props {
    initialValues: SecurityQuestion;
    onSubmit: (values: SecurityQuestion) => void;
}

const SecurityQuestionFormValidator: React.FC<Props> = ({ initialValues, onSubmit }) => {
    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        description: Yup.string().required("La descripción es obligatoria"),
    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
            <Form className="p-3 border rounded bg-light shadow-sm">
            <div className="mb-3">
                <label className="form-label">Pregunta de Seguridad</label>
                <Field name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
                <label className="form-label">Descripción</label>
                <Field as="textarea" name="description" className="form-control" rows={3} />
                <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-success w-100">
                Guardar Pregunta
            </button>
            </Form>
        )}
        </Formik>
    );
};

export default SecurityQuestionFormValidator;
