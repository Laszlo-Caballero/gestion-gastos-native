import z from "zod";

export const registerSchema = z
  .object({
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
    confirmPassword: z.string({
      error: "La confirmación de la contraseña es obligatoria",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Las contraseñas no coinciden",
      });
    }
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
