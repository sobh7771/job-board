import { z } from 'zod';

import { Role } from '@/lib/drizzle/schema';

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(255, 'Email must be at most 255 characters long.')
    .toLowerCase(),
  name: z
    .string()
    .min(1, 'Name is required.')
    .trim()
    .max(50, 'Name must be less than 50 characters.'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long.')
    .max(255, 'Password is too long.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(
      /[@$!%*?&]/,
      'Password must contain at least one special character.'
    ),
  role: z.nativeEnum(Role).optional(),
});

export type RegisterUserInput = z.infer<typeof registerSchema>;
