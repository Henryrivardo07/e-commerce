// src/features/cart/api.ts
import { http, isAuthError } from '@/lib/api';

export interface CartItem {
  id: number;
  productId: number;
  qty: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  grandTotal: number;
}

export async function getCart(): Promise<Cart> {
  try {
    return await http.get<Cart>('/api/cart');
  } catch (e) {
    if (isAuthError(e)) {
      return { items: [], subtotal: 0, grandTotal: 0 };
    }
    throw e;
  }
}

export async function getCartCount(): Promise<number> {
  try {
    const res = await http.get<{ data: { count: number } }>('/api/cart');
    return res.data.count ?? 0;
  } catch (e) {
    if (isAuthError(e)) return 0; // <- tidak errorkan UI
    throw e;
  }
}
