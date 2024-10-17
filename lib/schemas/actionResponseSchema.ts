import { z } from 'zod';

export const actionResponseSchema = z.object({
  success: z.string().optional(),
  error: z.string().optional(),
  statusCode: z.number(),
});
