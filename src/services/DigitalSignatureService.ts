import { api } from "./api";
import type { DigitalSignature } from "../models/DigitalSignature";
import { getAuth } from "firebase/auth";

export const digitalSignatureService = {
    getAll: async (): Promise<DigitalSignature[]> => {
        const { data } = await api.get("/digital-signatures");
        return data;
    },

    getById: async (id: number): Promise<DigitalSignature> => {
        const { data } = await api.get(`/digital-signatures/${id}`);
        return data;
    },

    create: async (formData: FormData): Promise<DigitalSignature> => {
        // ✅ Obtener el userId numérico desde el FormData
        const userId = formData.get("userId");

        if (!userId) {
        throw new Error("El ID de usuario es requerido para crear la firma.");
        }

        const { data } = await api.post(`/digital-signatures/user/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        });

        return data;
    },

    update: async (id: number, signature: DigitalSignature): Promise<DigitalSignature> => {
        if (signature.photo instanceof File) {
        const formData = new FormData();
        formData.append("photo", signature.photo);
        if (signature.userId) formData.append("userId", String(signature.userId));

        const { data } = await api.put(`/digital-signatures/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
        }

        const { data } = await api.put(`/digital-signatures/${id}`, signature);
        return data;
    },

    remove: async (id: number): Promise<void> => {
        await api.delete(`/digital-signatures/${id}`);
    },
};
