import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { digitalSignatureService } from "../../services/DigitalSignatureService";
import type { DigitalSignature } from "../../models/DigitalSignature";
import GenericTable from "../../components/GenericTable";

const ListDigitalSignatures: React.FC = () => {
    const [signatures, setSignatures] = useState<DigitalSignature[]>([]);
    const [tableStyle, setTableStyle] = useState<"material" | "bootstrap" | "tailwind">("bootstrap");
    const navigate = useNavigate();

    const loadSignatures = async () => {
        try {
        const data = await digitalSignatureService.getAll();
        setSignatures(data);
        } catch {
        Swal.fire("Error", "No se pudieron cargar las firmas digitales", "error");
        }
    };

    useEffect(() => {
        loadSignatures();
    }, []);

    const handleDelete = async (id?: number) => {
        if (!id) return;
        const confirm = await Swal.fire({
        title: "¿Eliminar firma?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        });
        if (confirm.isConfirmed) {
        await digitalSignatureService.remove(id);
        loadSignatures();
        Swal.fire("Eliminado", "Firma eliminada con éxito", "success");
        }
    };

    const handleAction = (actionName: string, signature: DigitalSignature) => {
        switch (actionName) {
        case "edit":
            navigate(`/digitalSignature/update/${signature.id}`);
            break;
        case "delete":
            handleDelete(signature.id);
            break;
        }
    };

    // 🧱 Definimos columnas
    const columns = ["id", "photo", "userId"];
    const actions = [
        { name: "edit", label: "Editar", color: "secondary" as const },
        { name: "delete", label: "Eliminar", color: "error" as const },
    ];

    // ✨ Transformamos datos para mostrar imagen o marcador
    // 🖼️ Construimos URLs absolutas y seguras para las imágenes
    // 🖼️ Construimos URLs absolutas y seguras para las imágenes
    const formattedData = signatures.map((s) => {
    let filename: string | undefined;

    if (typeof s.photo === "string") {
        // 👇 Forzamos a TypeScript a tratarlo como string
        filename = (s.photo as string).split("/").pop();
    } else if (s.photo instanceof File) {
        filename = s.photo.name;
    }

    const API_URL = import.meta.env.VITE_API_URL;
    const imageUrl = filename ? `${API_URL}/digital-signatures/${filename}` : null;

    return {
        ...s,
        photo: imageUrl ? (
        <img
            src={imageUrl}
            alt={`firma-${s.id}`}
            style={{
            height: 60,
            borderRadius: "6px",
            objectFit: "contain",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
            onError={(e) => {
            (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/100x60?text=No+Image";
            }}
        />
        ) : (
        "-"
        ),
        userId: s.userId ?? "-",
    };
    });



    return (
        <div className="container mt-4">
        <h2 className="text-success text-center mb-4">
            Lista de Firmas Digitales
        </h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/digitalSignature/create" className="btn btn-success">
            + Nueva Firma
            </Link>

            {/* Selector de estilo */}
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

export default ListDigitalSignatures;
