import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address.')
    .max(255, 'Email must be at most 255 characters long.'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(255, 'Password is too long.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(
      /[@$!%*?&]/,
      'Password must contain at least one special character.'
    ),
});

export type LoginUserInput = z.infer<typeof loginSchema>;
