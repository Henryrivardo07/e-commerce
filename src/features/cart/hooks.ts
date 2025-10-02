import { useQuery } from '@tanstack/react-query';

import { getToken } from '@/lib/auth';

import { type Cart, getCart, getCartCount } from './api';

export function useCart() {
  const enabled = !!getToken();
  return useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled, // ⬅️ hanya fetch jika login
    retry: false,
  });
}

export function useCartCount(enabled: boolean) {
  return useQuery<number>({
    queryKey: ['cart', 'count'],
    queryFn: getCartCount,
    enabled, // <- penting, fetch kalo memang sudah login
    select: (n) => n ?? 0,
  });
}
