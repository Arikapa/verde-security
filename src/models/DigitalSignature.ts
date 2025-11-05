export interface DigitalSignature {
    id?: number;
    photo?: string;
    // 🔹 Relación inversa 1:1 con User
    userId?: number; 
}
