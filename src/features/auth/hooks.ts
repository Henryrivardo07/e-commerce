import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { LoginPayload, LoginResponse, User } from '@/entities/auth';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';

import { getMe, login } from './api';

export function useMe() {
  const enabled = !!getToken();
  return useQuery<User | null>({
    queryKey: ['me'],
    queryFn: getMe,
    enabled, // ⬅️ hanya fetch kalau ada token
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: login,
    onSuccess: (res) => {
      // Guard: kalau backend tidak mengembalikan token, log agar ketahuan
      if (!res?.token) {
        console.warn('Login success but no token found:', res);
        return;
      }
      localStorage.setItem('token', res.token);
      // set default header biar request berikutnya langsung bawa token
      api.defaults.headers.Authorization = `Bearer ${res.token}`;
      // refresh data dependent
      qc.invalidateQueries({ queryKey: ['me'] });
      qc.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    // bersihin cache supaya UI langsung reflect logged-out
    qc.clear(); // atau invalidate ["me"], ["cart"]
  };
}
