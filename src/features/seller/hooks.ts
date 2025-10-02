// src/features/seller/hooks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ActivateSellerPayload, Shop } from '@/entities/seller';

import { activateSeller, getMyShop } from './api';

const SHOP_KEY = ['shop', 'mine']; // <- SATU SUMBER KEBENARAN

export function useActivateSeller() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: ActivateSellerPayload) => activateSeller(p),
    onSuccess: (res) => {
      // res: { success, message, data: Shop }
      qc.setQueryData<Shop | null>(SHOP_KEY, res.data);
      qc.invalidateQueries({ queryKey: SHOP_KEY });
      qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
}

export function useMyShop(enabled = true) {
  return useQuery({
    queryKey: SHOP_KEY,
    queryFn: getMyShop,
    enabled,
    staleTime: 60_000,
  });
}
