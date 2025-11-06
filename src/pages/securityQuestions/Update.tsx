import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { securityQuestionService } from "../../services/SecurityQuestionService";
import { useNavigate } from "react-router-dom";
import SecurityQuestionFormValidator from "../../components/SecurityQuestionFormValidator";
import type { SecurityQuestion } from "../../models/SecurityQuestion";

const UpdateSecurityQuestion: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [question, setQuestion] = useState<SecurityQuestion | null>(null);

    useEffect(() => {
        if (id) {
        securityQuestionService
            .getById(Number(id))
            .then(setQuestion)
            .catch(() => Swal.fire("Error", "No se pudo cargar la pregunta", "error"));
        }
    }, [id]);

    const handleSubmit = async (values: SecurityQuestion) => {
        try {
        await securityQuestionService.update(Number(id), values);
        Swal.fire("Éxito", "Pregunta actualizada correctamente", "success");
        setTimeout(() => navigate("/securityQuestion/list"), 800);
        } catch {
        Swal.fire("Error", "No se pudo actualizar la pregunta", "error");
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="text-success mb-4 text-center">Actualizar Pregunta de Seguridad</h2>
        {question ? (
            <SecurityQuestionFormValidator initialValues={question} onSubmit={handleSubmit} />
        ) : (
            <p>Cargando...</p>
        )}
        </div>
    );
};

export default UpdateSecurityQuestion;
