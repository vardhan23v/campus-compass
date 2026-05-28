// src/lib/validators.ts
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const collegeFilterSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  maxFees: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(9),
});

export const saveCollegeSchema = z.object({
  collegeId: z.string().min(1, "College ID is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CollegeFilterInput = z.infer<typeof collegeFilterSchema>;
export type SaveCollegeInput = z.infer<typeof saveCollegeSchema>;
