import { z } from 'zod';

export const successResponseSchema = z.object({
  success: z.string(),
  statusCode: z.number(),
  data: z.unknown(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
  statusCode: z.number(),
});

export const actionResponseSchema = z.union([
  successResponseSchema,
  errorResponseSchema,
]);
