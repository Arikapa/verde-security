import React from "react";
import type { DigitalSignature } from "../models/DigitalSignature";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface DigitalSignatureFormProps {
    mode: number; // 1 = crear, 2 = actualizar
    handleCreate?: (values: DigitalSignature) => void;
    handleUpdate?: (values: DigitalSignature) => void;
    signature?: DigitalSignature | null;
}

const DigitalSignatureFormValidator: React.FC<DigitalSignatureFormProps> = ({
    mode,
    handleCreate,
    handleUpdate,
    signature,
}) => {
  // Función para convertir una imagen en Base64
    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
        });

    // Manejo del envío del formulario
    const handleSubmit = (values: DigitalSignature) => {
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
            signature ?? {
            id: 0,
            photo: "",
            }
        }
        validationSchema={Yup.object({
            photo: Yup.string().required("Debe subir una imagen")
                .test(
                "fileSize",
                "La imagen no debe superar los 2 MB",
                (value) => {
                if (!value) return false;
                const sizeInBytes = atob(value.split(",")[1]).length;
                return sizeInBytes < 2 * 1024 * 1024; // 2MB
                }
            ),
        })}
        onSubmit={handleSubmit}
        >
        {({ setFieldValue, values, isSubmitting }) => (
            <Form className="p-4 bg-white rounded shadow-sm">
            <div className="card p-3 border-0">
                <h5 className="card-title mb-3">
                {mode === 1 ? "Registrar firma digital" : "Actualizar firma digital"}
                </h5>

                {/* Campo de carga de imagen */}
                <div className="mb-3">
                <label htmlFor="photo" className="form-label">Subir firma digital</label>
                <input type="file" accept="image/*" onChange={async (e) => {const file = e.currentTarget.files?.[0];
                        if (file) {
                            const base64 = await toBase64(file);
                            setFieldValue("photo", base64);
                        }
                    }}
                    className="form-control"
                />
                <ErrorMessage name="photo">{(msg) => <div className="form-text text-danger">{msg}</div>}</ErrorMessage>
                </div>

                {/* Vista previa de la firma */}
                {values.photo && (
                    <div className="mb-3 text-center">
                    <img src={values.photo} alt="Vista previa de firma" className="img-thumbnail" 
                            style={{
                                width: 180,
                                height: 180,
                                objectFit: "contain",
                                border: "1px solid #dee2e6",
                            }}
                        />
                    </div>  
                )}

                {/* Botón de envío */}
                <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
                >
                {isSubmitting ? "Guardando..." : mode === 1 ? "Registrar Firma" : "Actualizar Firma"}
                </button>
            </div>
            </Form>
        )}
        </Formik>
    );
};

export default DigitalSignatureFormValidator;
