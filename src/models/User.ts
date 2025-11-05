import { type DigitalSignature } from './DigitalSignature';
import { type Device } from './Device';
import { type Answer } from './Answer';

export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    age?: number;
    city?: string;
    phone?: string;
    is_active?: boolean;
    token?: string;
    sessions?: any[];
    // 🔹 Relación 1:1
    digitalSignature?: DigitalSignature; 
    // 🔹 Un usuario puede tener varios dispositivos
    devices?: Device[]; 
    // 🔹 Un usuario puede tener muchas respuestas
    answers?: Answer[]; 


}
