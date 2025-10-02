// src/features/seller/api.ts
import axios from 'axios';

import type {
  ActivateSellerPayload,
  ActivateSellerResponse,
  Shop,
} from '@/entities/seller';
import { api } from '@/lib/api';

// POST /api/seller/activate (multipart)
export async function activateSeller(
  p: ActivateSellerPayload
): Promise<ActivateSellerResponse> {
  const fd = new FormData();
  fd.append('name', p.name);
  if (p.slug) fd.append('slug', p.slug);
  if (p.address) fd.append('address', p.address);
  if (p.logo) fd.append('logo', p.logo); // File

  const { data } = await api.post<ActivateSellerResponse>(
    '/api/seller/activate',
    fd,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return data; // <- { success, message, data: Shop }
}

// GET /api/seller/shop -> { success, data: Shop }
export async function getMyShop(): Promise<Shop | null> {
  try {
    const res = await api.get<{
      success: boolean;
      message?: string;
      data: Shop;
    }>('/api/seller/shop');
    return res.data.data; // <- UNPACK
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) return null;
    throw err;
  }
}
