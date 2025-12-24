import { z } from "zod";

export const userLoginSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserLoginSchema = z.infer<typeof userLoginSchema>;

export const userDetailsForm = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum character limit is 3" })
    .max(25, { message: "Maximum character limit is 25" }),
  age: z
    .number()
    .min(16, { message: "Minimum age limit is 16" })
    .max(60, { message: "Maximum age limit is 60" }),
  message: z
    .string()
    .max(255, { message: "Maximum character limit is 255" })
    .min(10, "Minimum character limit is 10"),
});

export type UserDetailsForm = z.infer<typeof userDetailsForm>;
