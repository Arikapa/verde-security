import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { digitalSignatureService } from "../../services/DigitalSignatureService";
import { useNavigate } from "react-router-dom";
import DigitalSignatureFormValidator from "../../components/DigitalSignatureFormValidator";
import type { DigitalSignature } from "../../models/DigitalSignature";

const UpdateDigitalSignature: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [signature, setSignature] = useState<DigitalSignature | null>(null);

    useEffect(() => {
        if (id) {
        digitalSignatureService
            .getById(Number(id))
            .then(setSignature)
            .catch(() => Swal.fire("Error", "No se pudo cargar la firma digital", "error"));
        }
    }, [id]);

    const handleSubmit = async (values: DigitalSignature) => {
        try {
        await digitalSignatureService.update(Number(id), values);
        Swal.fire("Éxito", "Firma digital actualizada correctamente", "success");
        setTimeout(() => navigate("/digitalSignature/list"), 800);
        } catch {
        Swal.fire("Error", "No se pudo actualizar la firma digital", "error");
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="text-success mb-4 text-center">Actualizar Firma Digital</h2>
        {signature ? (
            <DigitalSignatureFormValidator initialValues={signature} onSubmit={handleSubmit} />
        ) : (
            <p>Cargando...</p>
        )}
        </div>
    );
};

export default UpdateDigitalSignature;
