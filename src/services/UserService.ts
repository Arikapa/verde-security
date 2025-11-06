import { api } from "./api";
import type { User } from "../models/User";

export const userService = {
    getAll: async (): Promise<User[]> => {
        const { data } = await api.get("/users");
        return data;
    },
    getById: async (id: number): Promise<User> => {
        const { data } = await api.get(`/users/${id}`);
        return data;
    },
    create: async (user: User): Promise<User> => {
        const { data } = await api.post("/users", user);
        return data;
    },
    update: async (id: number, user: User): Promise<User> => {
        const { data } = await api.put(`/users/${id}`, user);
        return data;
    },
    remove: async (id: number): Promise<void> => {
        await api.delete(`/users/${id}`);
    },
};
