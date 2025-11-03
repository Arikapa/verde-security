import type { DigitalSignature } from "../models/DigitalSignature";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface DigitalSignatureFormProps {
    mode: number; // 1 = crear, 2 = actualizar
    handleCreate?: (values: DigitalSignature) => void;
    handleUpdate?: (values: DigitalSignature) => void;
    signature?: DigitalSignature | null;
}

const DigitalSignatureFormValidator: React.FC<DigitalSignatureFormProps> = ({mode, handleCreate, handleUpdate, signature,}) => {
  // Convierte una imagen en base64
    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });

const handleSubmit = (values: DigitalSignature) => {
    if (mode == 1 && handleCreate) {
        handleCreate(values); // Si `handleCreate` está definido, lo llamamos
    } else if (mode === 2 && handleUpdate) {
        handleUpdate(values); // Si `handleUpdate` está definido, lo llamamos
    } else {
        console.error("Modo inválido o función no definida");
    }
};

return (
    <Formik
        // Inicializamos los valores del formulario, 
        // si user tiene un valor (actualizacion), lo usamos para inicializar el formulario
        // si user es nulo o indefinido (creación), usamos valores por defecto

        initialValues={signature ?? { 
            id: 0, 
            photo: "" 
        }}
        
        validationSchema={Yup.object({
            photo: Yup.string().required("Debe subir una imagen"),
        })}
        onSubmit={handleSubmit}
    >
        {({ setFieldValue }) => (
            <Form className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                {/* Carga de imagen */}
                <div>
                    <label htmlFor="photo" className="block text-lg font-medium text-gray-700">
                    Subir firma digital
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                            const file = e.currentTarget.files?.[0];
                            if (file) {
                                const base64 = await toBase64(file);
                                setFieldValue("photo", base64);
                            }
                        }}
                        className="w-full border rounded-md p-2"
                    />
                    <ErrorMessage name="photo" component="p" className="text-red-500 text-sm" />
                </div>

                {/* Vista previa de la imagen */}
                <Field name="photo">
                    {({ field }: any) =>
                        field.value ? (
                            <img
                            src={field.value}
                            alt="Vista previa de firma"
                            className="w-40 h-40 object-contain border rounded-md mt-2"
                            />
                        ) : null
                    }
                </Field>

                {/* Botón */}
                <button type="submit" className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition">
                    {mode === 1 ? "Crear Firma" : "Actualizar Firma"}
                </button>
            </Form>
    )}
    </Formik>

    );
};

export default DigitalSignatureFormValidator;


// AnswerFormValidator y DeviceFormValidator siguen un patrón similar al de UserFormValidator y DigitalSignatureFormValidator, adaptando los campos y validaciones según las propiedades de los modelos Answer y Device respectivamente.

// AnswerFormValidator y DeviceFormValidator