import { api } from "./api";
import type { SecurityQuestion } from "../models/SecurityQuestion";

export const securityQuestionService = {
    getAll: async (): Promise<SecurityQuestion[]> => {
        const { data } = await api.get("/security-questions");
        return data;
    },
    getById: async (id: number): Promise<SecurityQuestion> => {
        const { data } = await api.get(`/security-questions/${id}`);
        return data;
    },
    create: async (question: SecurityQuestion): Promise<SecurityQuestion> => {
        const { data } = await api.post("/security-questions", question);
        return data;
    },
    update: async (id: number, question: SecurityQuestion): Promise<SecurityQuestion> => {
        const { data } = await api.put(`/security-questions/${id}`, question);
        return data;
    },
    remove: async (id: number): Promise<void> => {
        await api.delete(`/security-questions/${id}`);
    },
};
