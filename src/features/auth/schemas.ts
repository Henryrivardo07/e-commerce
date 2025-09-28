import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});
export type SignInInput = z.infer<typeof SignInSchema>;

/** Form schema (nilai dari form) */
export const SignUpSchema = z.object({
  name: z.string().min(2, "Minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
  avatar: z.instanceof(File).optional(),
  // boleh kosong ("") ATAU url valid
  avatarUrl: z
    .union([z.literal(""), z.string().url("URL tidak valid")])
    .optional(),
});

/** Tipe form values (sesuai RHF) */
export type SignUpFormValues = z.infer<typeof SignUpSchema>;
