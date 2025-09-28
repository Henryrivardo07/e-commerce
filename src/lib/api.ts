// src/lib/api.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// Inject token (kalau ada)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper: kembalikan langsung data bertipe T (bukan AxiosResponse<T>)
export const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.get<T>(url, config);
    return res.data;
  },
  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await api.post<T>(url, data, config);
    return res.data;
  },
  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await api.patch<T>(url, data, config);
    return res.data;
  },
  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await api.put<T>(url, data, config);
    return res.data;
  },
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await api.delete<T>(url, config);
    return res.data;
  },
};

// Type-safe error message (tanpa any)
export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const ax = err as AxiosError<{ message?: string }>;
    return ax.response?.data?.message ?? err.message;
  }
  return (err as { message?: string })?.message ?? "Unknown error";
}
