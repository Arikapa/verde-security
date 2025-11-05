export interface Answer {
    id?: number;
    content?: string;
    //FK a SecurityQuestion
    questionId?: number;  
    //FK a User (antes tenías id_client)
    userId?: number;      
}
