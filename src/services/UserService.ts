// src/services/UserService.ts
import apiClient from "./apiClient";

export const getUsers = async () => {
    const response = await apiClient.get("/users");
    return response.data;
};

export const createUser = async (data: any) => {
    const response = await apiClient.post("/users", data);
    return response.data;
};
