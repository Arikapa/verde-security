import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDesignLibrary } from "../context/DesignLibraryContext";

interface DigitalSignature {
    id?: number;
    photo?: string;
}

interface Props {
    mode: number;
    handleCreate?: (values: DigitalSignature) => void;
    handleUpdate?: (values: DigitalSignature) => void;
    signature?: DigitalSignature | null;
}


const DigitalSignatureFormValidator: React.FC<Props> = ({
    mode,
    handleCreate,
    handleUpdate,
    signature,
}) => {
    const { library } = useDesignLibrary();

    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const handleSubmit = (values: DigitalSignature) => {
        if (mode === 1 && handleCreate) handleCreate(values);
        else if (mode === 2 && handleUpdate) handleUpdate(values);
        else console.error("No function provided for the current mode");
    };

    // Estilos dinámicos según la librería
    const inputClass =
        library === "tailwind"
        ? "w-full border rounded-md p-2"
        : library === "bootstrap"
        ? "form-control"
        : "MuiInputBase-input MuiOutlinedInput-input";

    const buttonClass =
        library === "tailwind"
        ? "bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
        : library === "bootstrap"
        ? "btn btn-primary px-4"
        : "MuiButton-root MuiButton-contained MuiButton-containedPrimary";

    const formClass =
        library === "tailwind"
        ? "grid grid-cols-1 gap-4 p-6 bg-white rounded-md shadow-md"
        : library === "bootstrap"
        ? "container p-4 border rounded bg-light shadow-sm"
        : "MuiPaper-root MuiPaper-elevation1 p-4";

    return (
        <Formik
        initialValues={signature ?? { id: 0, photo: "" }}
        validationSchema={Yup.object({
            photo: Yup.string().required("Debe subir una imagen"),
        })}
        onSubmit={handleSubmit}
        >
        {({ setFieldValue }) => (
            <Form className={formClass} style={{ maxWidth: "500px" }}>
            {/* Carga de imagen */}
            <div className={library === "bootstrap" ? "mb-3" : ""}>
                <label
                htmlFor="photo"
                className={
                    library === "tailwind"
                    ? "block text-lg font-medium text-gray-700"
                    : "form-label fw-bold"
                }
                >
                Subir firma digital
                </label>
                <input
                type="file"
                accept="image/*"
                className={inputClass}
                onChange={async (e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                    const base64 = await toBase64(file);
                    setFieldValue("photo", base64);
                    }
                }}
                />
                <ErrorMessage
                name="photo"
                component="p"
                className={library === "bootstrap" ? "text-danger small mt-1" : "text-red-500 text-sm"}
                />
            </div>

            {/* Vista previa */}
            <Field name="photo">
                {({ field }: any) =>
                field.value ? (
                    <div className="text-center mb-3">
                    <img
                        src={field.value}
                        alt="Vista previa de firma"
                        className={
                        library === "bootstrap"
                            ? "img-thumbnail"
                            : "rounded-md border shadow-sm"
                        }
                        style={{ width: "150px", height: "150px", objectFit: "contain" }}
                    />
                    </div>
                ) : null
                }
            </Field>

            {/* Botón */}
            <div className="text-center">
                <button type="submit" className={buttonClass}>
                {mode === 1 ? "Crear Firma" : "Actualizar Firma"}
                </button>
            </div>
            </Form>
        )}
        </Formik>
    );
};

export default DigitalSignatureFormValidator;
