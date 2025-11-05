import axios from "axios";
import { type Answer } from "../models/Answer";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/answers" || "";

class AnswerService {
    async getAnswers(): Promise<Answer[]> {
        try {
            const response = await api.get("/answers");
            return response.data;
        } catch (error) {
            console.error("Error al obtener respuestas:", error);
            return [];
        }
    }

    async getAnswerById(id: number): Promise<Answer | null> {
        try {
            const response = await axios.get<Answer>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Respuesta no encontrada:", error);
            return null;
        }
    }

    async createAnswer(answer: Omit<Answer, "id">): Promise<Answer | null> {
        try {
            const response = await axios.post<Answer>(API_URL, answer);
            return response.data;
        } catch (error) {
            console.error("Error al crear respuesta:", error);
            return null;
        }
    }

    async updateAnswer(id: number, answer: Partial<Answer>): Promise<Answer | null> {
        try {
            const response = await axios.put<Answer>(`${API_URL}/${id}`, answer);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar respuesta:", error);
            return null;
        }
    }

    async deleteAnswer(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar respuesta:", error);
            return false;
        }
    }
}

// Exportamos una instancia de la clase para reutilizarla
export const answerService = new AnswerService();

/*
- GET /api/answers - List all
- GET /api/answers/{id} - Get one
- POST /api/answers - Create
- PUT /api/answers/{id} - Update
- DELETE /api/answers/{id} - Delete
*/
