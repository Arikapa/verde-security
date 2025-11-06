import React from "react";
import Swal from "sweetalert2";
import { securityQuestionService } from "../../services/SecurityQuestionService";
import { useNavigate } from "react-router-dom";
import SecurityQuestionFormValidator from "../../components/SecurityQuestionFormValidator";
import type { SecurityQuestion } from "../../models/SecurityQuestion";

const CreateSecurityQuestion: React.FC = () => {
    const navigate = useNavigate();
    const initialValues: SecurityQuestion = {
        name: "",
        description: "",
    };

    const handleSubmit = async (values: SecurityQuestion) => {
        try {
        await securityQuestionService.create(values);
        Swal.fire("Éxito", "Pregunta creada correctamente", "success");
        setTimeout(() => navigate("/securityQuestion/list"), 800);
        } catch (error) {
        Swal.fire("Error", "No se pudo crear la pregunta", "error");
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="text-success mb-4 text-center">Registrar Pregunta de Seguridad</h2>
        <SecurityQuestionFormValidator initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateSecurityQuestion;
