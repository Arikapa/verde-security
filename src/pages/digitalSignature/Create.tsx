import React from "react";
import Swal from "sweetalert2";
import { digitalSignatureService } from "../../services/DigitalSignatureService";
import DigitalSignatureFormValidator from "../../components/DigitalSignatureFormValidator";
import { useNavigate } from "react-router-dom";
import type { DigitalSignature } from "../../models/DigitalSignature";

const CreateDigitalSignature: React.FC = () => {
    const navigate = useNavigate();
    const initialValues: DigitalSignature = {
        photo: null,   // ✅ Debe ser null, no cadena vacía
        userId: undefined,
    };

    const handleSubmit = async (values: DigitalSignature) => {
        try {
            const formData = new FormData();
            if (values.photo) formData.append("photo", values.photo);
            if (values.userId) formData.append("userId", String(values.userId));

            await digitalSignatureService.create(formData); // 👈 sin error si cambias el tipo en el servicio

            Swal.fire("Éxito", "Firma digital creada correctamente", "success");
            setTimeout(() => navigate("/digitalSignature/list"), 800);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo crear la firma digital", "error");
        }
    };


    return (
        <div className="container mt-4">
        <h2 className="text-success mb-4 text-center">Registrar Firma Digital</h2>
        <DigitalSignatureFormValidator
            initialValues={initialValues}
            onSubmit={handleSubmit}
        />
        </div>
    );
};

export default CreateDigitalSignature;
