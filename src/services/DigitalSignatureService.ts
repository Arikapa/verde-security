import axios from "axios";
import { type DigitalSignature } from "../models/DigitalSignature";
import api from "../interceptors/axiosInterceptor";

const API_URL = import.meta.env.VITE_API_URL + "/digital-signatures" || "";

class DigitalSignatureService {
    async getDigitalSignatures(): Promise<DigitalSignature[]> {
        try {
            const response = await api.get("/digital-signatures");
            return response.data;
        } catch (error) {
            console.error("Error al obtener firmas digitales:", error);
            return [];
        }
    }

    async getDigitalSignatureById(id: number): Promise<DigitalSignature | null> {
        try {
            const response = await axios.get<DigitalSignature>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Firma digital no encontrada:", error);
            return null;
        }
    }

    async createDigitalSignature(signature: Omit<DigitalSignature, "id">): Promise<DigitalSignature | null> {
        try {
            const response = await axios.post<DigitalSignature>(API_URL, signature);
            return response.data;
        } catch (error) {
            console.error("Error al crear firma digital:", error);
            return null;
        }
    }

    async updateDigitalSignature(id: number, signature: Partial<DigitalSignature>): Promise<DigitalSignature | null> {
        try {
            const response = await axios.put<DigitalSignature>(`${API_URL}/${id}`, signature);
            return response.data;
        } catch (error) {
            console.error("Error al actualizar firma digital:", error);
            return null;
        }
    }

    async deleteDigitalSignature(id: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar firma digital:", error);
            return false;
        }
    }
}

// Exportamos una instancia de la clase para reutilizarla
export const digitalSignatureService = new DigitalSignatureService();

/*
- GET /api/digital-signatures - List all
- GET /api/digital-signatures/{id} - Get one
- POST /api/digital-signatures - Create
- PUT /api/digital-signatures/{id} - Update
- DELETE /api/digital-signatures/{id} - Delete
*/
