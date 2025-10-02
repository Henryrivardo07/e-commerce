import { z } from 'zod';

export const ActivateSellerSchema = z.object({
  name: z.string().min(2, 'Min 2 chars'),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  address: z.string().min(3).optional(),
  // File optional. Gunakan custom biar aman di SSR/TS.
  logo: z
    .custom<File>((v) => v instanceof File, { message: 'Invalid file' })
    .optional(),
});
export type ActivateSellerInput = z.infer<typeof ActivateSellerSchema>;
