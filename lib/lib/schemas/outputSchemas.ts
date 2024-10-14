import { z } from 'zod';

export const outputSchema = z.object({
  success: z.string().optional(),
  error: z.string().optional(),
  statusCode: z.number(),
});
