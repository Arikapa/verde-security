import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { securityQuestionService } from "../../services/SecurityQuestionService";
import type { SecurityQuestion } from "../../models/SecurityQuestion";
import GenericTable from "../../components/GenericTable";

const ListSecurityQuestions: React.FC = () => {
    const [questions, setQuestions] = useState<SecurityQuestion[]>([]);
    const [tableStyle, setTableStyle] = useState<"material" | "bootstrap" | "tailwind">("bootstrap");
    const navigate = useNavigate();

    const loadQuestions = async () => {
        try {
        const data = await securityQuestionService.getAll();
        setQuestions(data);
        } catch {
        Swal.fire("Error", "No se pudieron cargar las preguntas", "error");
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    const handleDelete = async (id?: number) => {
        if (!id) return;
        const confirm = await Swal.fire({
        title: "¿Eliminar pregunta?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        });
        if (confirm.isConfirmed) {
        await securityQuestionService.remove(id);
        loadQuestions();
        Swal.fire("Eliminado", "Pregunta eliminada con éxito", "success");
        }
    };

    const handleAction = (actionName: string, question: SecurityQuestion) => {
        switch (actionName) {
        case "edit":
            navigate(`/securityQuestion/update/${question.id}`);
            break;
        case "delete":
            handleDelete(question.id);
            break;
        }
    };

    const columns = ["id", "name", "description", "answers"];
    const actions = [
        { name: "edit", label: "Editar", color: "secondary" as const },
        { name: "delete", label: "Eliminar", color: "error" as const },
    ];

    // Transformamos los datos para mostrar cantidad de respuestas
    const formattedData = questions.map((q) => ({
        ...q,
        answers: q.answers ? q.answers.length : 0,
    }));

    return (
        <div className="container mt-4">
        <h2 className="text-success text-center mb-4">
            Lista de Preguntas de Seguridad
        </h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/securityQuestion/create" className="btn btn-success">
            + Nueva Pregunta
            </Link>

            {/* Selector de estilo de tabla */}
            <select
            className="form-select w-auto"
            value={tableStyle}
            onChange={(e) =>
                setTableStyle(e.target.value as "material" | "bootstrap" | "tailwind")
            }
            >
            <option value="material">Material UI</option>
            <option value="bootstrap">Bootstrap</option>
            <option value="tailwind">Tailwind</option>
            </select>
        </div>

        <GenericTable
            data={formattedData}
            columns={columns}
            actions={actions}
            onAction={handleAction}
            styleType={tableStyle}
        />
        </div>
    );
};

export default ListSecurityQuestions;
