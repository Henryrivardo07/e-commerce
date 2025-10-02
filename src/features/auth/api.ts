// src/features/auth/api.ts
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User,
} from '@/entities/auth';
import { api, http, isAuthError } from '@/lib/api';
import { ApiSuccess } from '@/types/https';

export async function login(p: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<{ success: boolean; data: LoginResponse }>(
    '/api/auth/login',
    p
  );
  return data.data;
}

export async function registerUser(payload: RegisterPayload) {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('email', payload.email);
  formData.append('password', payload.password);

  if (payload.avatar) {
    formData.append('avatar', payload.avatar); // kirim file
  } else if (payload.avatarUrl) {
    formData.append('avatarUrl', payload.avatarUrl); // fallback string
  }

  const res = await api.post<RegisterResponse>('/api/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
}

export async function getMe(): Promise<User | null> {
  try {
    const res = await http.get<ApiSuccess<User>>('/api/me');
    return res.data; // <- ambil di dalam "data"
  } catch (e) {
    if (isAuthError(e)) return null;
    throw e;
  }
}
