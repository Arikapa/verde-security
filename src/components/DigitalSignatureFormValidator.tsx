import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { DigitalSignature } from "../models/DigitalSignature";
import type { User } from "../models/User";
import { userService } from "../services/userService";

interface Props {
  initialValues: DigitalSignature;
  onSubmit: (values: DigitalSignature) => void;
}

const DigitalSignatureFormValidator: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    userService.getAll().then(setUsers).catch(() => setUsers([]));
  }, []);

  const validationSchema = Yup.object({
    photo: Yup.mixed().required("Debe subir una imagen"),
    userId: Yup.number().required("Debe seleccionar un usuario"),
  });

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isSubmitting, setFieldValue, values }) => {
        // ⚡ Crear y liberar la URL de vista previa
        useEffect(() => {
          if (values.photo instanceof File) {
            const objectUrl = URL.createObjectURL(values.photo);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
          } else {
            setPreview(null);
          }
        }, [values.photo]);

        return (
          <Form className="p-3 border rounded bg-light shadow-sm">
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
              <label className="form-label">Subir Firma Digital</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0] || null;
                  setFieldValue("photo", file);
                }}
              />
              <ErrorMessage name="photo" component="div" className="text-danger" />
            </div>

            {preview && (
              <div className="text-center mb-3">
                <img
                  src={preview}
                  alt="Vista previa"
                  style={{ maxHeight: 150, borderRadius: 8 }}
                />
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="btn btn-success w-100">
              Guardar Firma
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DigitalSignatureFormValidator;
