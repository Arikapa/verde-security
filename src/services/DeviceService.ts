import { api } from "./api";
import type { Device } from "../models/Device";
import { getAuth } from "firebase/auth";

export const deviceService = {
  getAll: async (): Promise<Device[]> => {
    const { data } = await api.get("/devices");
    return data;
  },

  getById: async (id: number): Promise<Device> => {
    const { data } = await api.get(`/devices/${id}`);
    return data;
  },

  create: async (device: Device): Promise<Device> => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = device.userId ?? 1; // o user?.uid si tu backend lo maneja así

    const payload: Device = {
      name: device.name,
      ip: device.ip,
      operating_system: device.operating_system,
    };

    // ✅ Ajuste aquí: nota el /user/${userId}
    const { data } = await api.post(`/devices/user/${userId}`, payload);
    return data;
  },


  update: async (id: number, device: Device): Promise<Device> => {
    const { data } = await api.put(`/devices/${id}`, device);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/devices/${id}`);
  },
};
