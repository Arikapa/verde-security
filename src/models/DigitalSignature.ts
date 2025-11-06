export interface DigitalSignature {
    id?: number;
    photo?: File | null;
    // 🔹 Relación inversa 1:1 con User
    userId?: number; 
}
