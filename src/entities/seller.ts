export interface Shop {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
  address?: string | null;
  isActive: boolean;
}

export interface ActivateSellerResponse {
  success: boolean;
  message: string;
  data: Shop;
}

// Payload dari FE (boleh kirim file)
export type ActivateSellerPayload = {
  name: string;
  slug?: string;
  address?: string;
  logo?: File | null;
};
