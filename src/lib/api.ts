// src/lib/api.ts

import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

// Inject token (kalau ada)
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      // kalau headers instance AxiosHeaders -> pakai .set
      if (
        config.headers &&
        typeof (config.headers as AxiosHeaders).set === 'function'
      ) {
        (config.headers as AxiosHeaders).set(
          'Authorization',
          `Bearer ${token}`
        );
      } else {
        // kalau headers masih plain object -> tambahkan key Authorization
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${token}`,
        } as any;
      }
    }
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
  return (err as { message?: string })?.message ?? 'Unknown error';
}

export function isAuthError(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 401;
}
