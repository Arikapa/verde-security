import { type Answer } from "./Answer";

export interface SecurityQuestion {
    id?: number;
    name?: string;
    description?: string;
    // 🔹 Una pregunta puede tener muchas respuestas
    answers?: Answer[]; 
}
