import z from "zod";

export const RegisterSchema = z
  .object({
    username: z
      .string({
        error: (iss) => (iss.input === undefined ? "Username is required" : "Invalid input"),
      })
      .min(3, "Username must be at least 3 characters long")
      .max(12, "Username must not exceed 12 characters")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Username may only contain letters and numbers without spaces or special characters",
      ),
    email: z.email({
      error: (iss) =>
        iss.input === undefined
          ? "Email address is required"
          : "Please provide a valid email address",
    }),
    password: z
      .string({
        error: (iss) => (iss.input === undefined ? "Password is required" : "Invalid input"),
      })
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must not exceed 64 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirm_password: z.string({
      error: (iss) =>
        iss.input === undefined ? "Password confirmation is required" : "Invalid input",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password confirmation does not match the password",
    path: ["confirmPassword"],
  })
  .required();

export type RegisterInputType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z
  .object({
    email: z.email({
      error: (iss) =>
        iss.input === undefined
          ? "Email address is required"
          : "Please provide a valid email address",
    }),
    password: z
      .string({
        error: (iss) => (iss.input === undefined ? "Password is required" : "Invalid input"),
      })
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must not exceed 64 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  })
  .required();

export type LoginInputType = z.infer<typeof LoginSchema>;
