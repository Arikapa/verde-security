import React from "react";
import { type Answer } from "../../models/Answer";
import AnswerFormValidator from "../../components/AnswerFormValidator";
import Swal from "sweetalert2";
import { answerService } from "../../services/AnswerService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";

const CreateAnswer: React.FC = () => {
    const navigate = useNavigate();

    // Lógica de creación
    const handleCreateAnswer = async (answer: Answer) => {
        try {
            const createdAnswer = await answerService.createAnswer(answer);

            if (createdAnswer) {
                Swal.fire({
                    title: "Completado",
                    text: "La respuesta se ha creado correctamente.",
                    icon: "success",
                    timer: 3000,
                });
                console.log("Respuesta creada con éxito:", createdAnswer);
                navigate("/ListAnswers"); // Redirigir a la lista de respuestas
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un problema al crear la respuesta.",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo crear la respuesta.",
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Respuesta</h2>
            <Breadcrumb pageName="Crear Respuesta" />
            <AnswerFormValidator handleCreate={handleCreateAnswer} mode={1} />
        </div>
    );
};

export default CreateAnswer;
