import { z } from 'zod';

import { JobListingStatus } from '@/lib/drizzle/schema';

export const jobListingFilterSchema = z.object({
  userId: z.string().optional(),
  status: z.nativeEnum(JobListingStatus).optional(),
  title: z.string().optional(),
  createdAtBefore: z.date().optional(),
  createdAtAfter: z.date().optional(),
});

export type JobListingFilter = z.infer<typeof jobListingFilterSchema>;
