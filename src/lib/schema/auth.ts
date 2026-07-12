import z from "zod";

export const registerSchema = z.object({
  email: z.email().min(1, { message: "Email is required" }),
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).refine((value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  }, {
    message: `Choose a stronger password with uppercase and lowercase letters, a number, and a special character.`,
  }),
  confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
  aggreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions to register",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  error: "Passwords do not match",
  path: ["confirmPassword"],
})