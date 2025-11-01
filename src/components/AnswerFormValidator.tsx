import type { Answer } from "../models/Answer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


// Definimos la interfaz para los props
interface AnswerFormProps {
    mode: number; // Puede ser 1 (crear) o 2 (actualizar)
    handleCreate?: (values: Answer) => void;
    handleUpdate?: (values: Answer) => void;
    answer?: Answer | null;
}



const AnswerFormValidator: React.FC<AnswerFormProps> = ({ mode, handleCreate, handleUpdate, answer }) => {
    const handleSubmit = (formattedValues: Answer) => {
        if (mode === 1 && handleCreate) {
            handleCreate(formattedValues);  // Si `handleCreate` está definido, lo llamamos
        } else if (mode === 2 && handleUpdate) {
            handleUpdate(formattedValues);  // Si `handleUpdate` está definido, lo llamamos
        } else {
            console.error('No function provided for the current mode');
        }
    };

    return (
        <Formik

            // Inicializamos los valores del formulario
            // Si `answer` tiene un valor (actualización), lo usamos para inicializar el formulario
            // Si `answer` es nulo o indefinido (creación), usamos valores por defecto

            initialValues={answer ? answer : {
                id: 0,
                content: "",
            }}

            // Esquema de validación con Yup
            validationSchema={Yup.object({
                content: Yup.string()
                    .trim()
                    .required("El contenido de la respuesta es obligatorio")
                    .min(2, "La respuesta debe tener al menos 2 caracteres"),
            })}

            // Función que se ejecuta al enviar el formulario
            onSubmit={(values) => {
                const formattedValues = { ...values };  // Aquí podrías formatear los datos si fuera necesario
                handleSubmit(formattedValues);
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md">
                    
                    {/* Campo: Contenido de la respuesta */}
                    <div>
                        <label htmlFor="content" className="block text-lg font-medium text-gray-700">Contenido</label>
                        <Field as="textarea" name="content" rows={3} placeholder="Escribe tu respuesta..." className="w-full border rounded-md p-2"/>
                        <ErrorMessage name="content" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className="text-black p-4"
                    >
                        {mode === 1 ? "Crear" : "Actualizar"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AnswerFormValidator;
