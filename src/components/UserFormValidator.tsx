import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { User } from "../models/User";

interface Props {
    initialValues: User;
    onSubmit: (values: User) => void;
}

const UserFormValidator: React.FC<Props> = ({ initialValues, onSubmit }) => {
    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
        password: Yup.string().min(6, "Debe tener al menos 6 caracteres").required("Campo obligatorio"),
        age: Yup.number().positive("Debe ser un número positivo").integer("Debe ser un número entero"),
        city: Yup.string(),
        phone: Yup.string(),
    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
            <Form className="p-3 border rounded bg-light shadow-sm">
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <Field name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <div className="row">
                <div className="col">
                <label className="form-label">Edad</label>
                <Field name="age" type="number" className="form-control" />
                <ErrorMessage name="age" component="div" className="text-danger" />
                </div>
                <div className="col">
                <label className="form-label">Ciudad</label>
                <Field name="city" className="form-control" />
                <ErrorMessage name="city" component="div" className="text-danger" />
                </div>
            </div>

            <div className="mt-3">
                <label className="form-label">Teléfono</label>
                <Field name="phone" className="form-control" />
                <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-success w-100 mt-4">
                Guardar Usuario
            </button>
            </Form>
        )}
        </Formik>
    );
};

export default UserFormValidator;
