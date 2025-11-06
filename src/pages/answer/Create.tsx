import React from "react";
import Swal from "sweetalert2";
import { answerService } from "../../services/AnswerService";
import { useNavigate } from "react-router-dom";
import AnswerFormValidator from "../../components/AnswerFormValidator";
import type { Answer } from "../../models/Answer";

const CreateAnswer: React.FC = () => {
    const navigate = useNavigate();
    const initialValues: Answer = {
        content: "",
        questionId: undefined,
        userId: undefined,
    };

    const handleSubmit = async (values: Answer) => {
        try {
            await answerService.create(values.userId!, values.questionId!, { content: values.content });
            Swal.fire("Éxito", "Respuesta creada correctamente", "success");
            setTimeout(() => navigate("/answer/list"), 800);
        } catch (error) {
            Swal.fire("Error", "No se pudo crear la respuesta", "error");
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="text-success mb-4 text-center">Registrar Respuesta</h2>
        <AnswerFormValidator initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateAnswer;
