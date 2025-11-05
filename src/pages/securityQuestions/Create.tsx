import React from "react";
import { type SecurityQuestion } from "../../models/SecurityQuestion";
import SecurityQuestionFormValidator from "../../components/SecurityQuestionFormValidator";
import Swal from "sweetalert2";
import { securityQuestionService } from "../../services/SecurityQuestionService";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";

const CreateSecurityQuestion: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateSecurityQuestion = async (question: SecurityQuestion) => {
        try {
            const createdQuestion = await securityQuestionService.createSecurityQuestion(question);

            if (createdQuestion) {
                Swal.fire({
                    title: "Completado",
                    text: "La pregunta de seguridad se ha creado correctamente.",
                    icon: "success",
                    timer: 3000,
                });
                console.log("Pregunta de seguridad creada con éxito:", createdQuestion);
                navigate("/ListSecurityQuestions"); // Redirige a la lista
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un problema al crear la pregunta de seguridad.",
                    icon: "error",
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo crear la pregunta de seguridad.",
                icon: "error",
                timer: 3000,
            });
        }
    };

    return (
        <div>
            <h2>Crear Pregunta de Seguridad</h2>
            <Breadcrumb pageName="Crear Pregunta de Seguridad" />
            <SecurityQuestionFormValidator
                handleCreate={handleCreateSecurityQuestion}
                mode={1} // 1 = Creación
            />
        </div>
    );
};

export default CreateSecurityQuestion;
