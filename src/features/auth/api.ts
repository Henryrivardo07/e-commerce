// src/features/auth/api.ts
import { api, http } from "@/lib/api";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User,
} from "@/entities/auth";

export function login(payload: LoginPayload) {
  return http.post<LoginResponse>("/api/auth/login", payload);
}

export async function registerUser(payload: RegisterPayload) {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("password", payload.password);

  if (payload.avatar) {
    formData.append("avatar", payload.avatar); // kirim file
  } else if (payload.avatarUrl) {
    formData.append("avatarUrl", payload.avatarUrl); // fallback string
  }

  const res = await api.post<RegisterResponse>("/api/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export function getMe() {
  return http.get<User>("/api/me");
}
