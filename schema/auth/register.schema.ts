import z from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      error: "El nombre de usuario es obligatorio",
    })
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.email({
    message: "El correo electrónico no es válido",
  }),
  password: z
    .string({
      error: "La contraseña es obligatoria",
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
