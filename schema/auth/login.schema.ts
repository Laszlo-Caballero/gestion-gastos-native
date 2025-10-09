import { z } from "zod";
export const loginSchema = z.object({
  username: z
    .string({
      error: "El nombre de usuario es obligatorio",
    })
    .min(2)
    .max(100),
  password: z
    .string({
      error: "La contraseña es obligatoria",
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña debe tener entre 6 y 100 caracteres"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
