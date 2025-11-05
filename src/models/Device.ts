export interface Device {
    id?: number;
    name?: string;
    ip?: string;
    operating_system?: string;
    // 🔹 Relación 1:N con User
    userId?: number; 
}
