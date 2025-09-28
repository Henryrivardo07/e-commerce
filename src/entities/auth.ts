// src/entities/auth.ts

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string; // optional, tergantung backend
  avatarUrl?: string; // URL hasil upload (bukan File)
  role: "USER" | "SELLER";
}

/**
 * Payload untuk register user baru
 */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  avatar?: File; // file upload dari laptop
  avatarUrl?: string; // fallback jika kirim URL langsung
}

/**
 * Response register berhasil
 */
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

/**
 * Payload untuk login
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Response login berhasil
 */
export interface LoginResponse {
  token: string;
  user: User;
}
