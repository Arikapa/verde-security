import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { answerService } from "../../services/AnswerService";
import { useNavigate } from "react-router-dom";
import AnswerFormValidator from "../../components/AnswerFormValidator";
import type { Answer } from "../../models/Answer";

const UpdateAnswer: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [answer, setAnswer] = useState<Answer | null>(null);

    useEffect(() => {

        if (id) {
        answerService
            .getById(Number(id))
            .then(setAnswer)
            .catch(() => Swal.fire("Error", "No se pudo cargar la respuesta", "error"));
        }
    }, [id]);

    const handleSubmit = async (values: Answer) => {
        try {
        await answerService.update(Number(id), values);
        Swal.fire("Éxito", "Respuesta actualizada correctamente", "success");
        setTimeout(() => navigate("/answer/list"), 800);
        } catch {
        Swal.fire("Error", "No se pudo actualizar la respuesta", "error");
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="text-success mb-4 text-center">Actualizar Respuesta</h2>
        {answer ? (
            <AnswerFormValidator initialValues={answer} onSubmit={handleSubmit} />
        ) : (
            <p>Cargando...</p>
        )}
        </div>
    );
};

export default UpdateAnswer;
