import z from "zod";

export const registerSchema = z.object({
  email: z.email().min(1, { message: "Email is required" }),
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
  aggreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions to register",
  }),
})