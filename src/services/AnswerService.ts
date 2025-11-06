import { api } from "./api";
import type { Answer } from "../models/Answer";

export const answerService = {
    getAll: async (): Promise<Answer[]> => {
        const { data } = await api.get("/answers");
        return data;
    },

    getById: async (id: number): Promise<Answer> => {
        const { data } = await api.get(`/answers/${id}`);
        return data;
    },

    // 🔹 Crear respuesta con rutas Flask REST
    create: async (userId: number, questionId: number, answer: Answer): Promise<Answer> => {
        const { data } = await api.post(
        `/answers/user/${userId}/question/${questionId}`,
        answer
        );
        return data;
    },

    update: async (id: number, answer: Answer): Promise<Answer> => {
        const { data } = await api.put(`/answers/${id}`, answer);
        return data;
    },

    remove: async (id: number): Promise<void> => {
        await api.delete(`/answers/${id}`);
    },
};
