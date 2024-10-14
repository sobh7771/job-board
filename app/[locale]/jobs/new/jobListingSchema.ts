import { z } from 'zod';

export const jobListingSchema = z.object({
  title: z.string().min(5, {
    message: 'Job title must be at least 5 characters.',
  }),
  company: z.string().min(2, {
    message: 'Company name must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  type: z.enum(['full-time', 'part-time', 'contract', 'internship'], {
    required_error: 'Please select a job type.',
  }),
  salary: z
    .string()
    .regex(/^\d+$/, {
      message: 'Salary must be a number.',
    })
    .transform((s) => Number(s)),
  description: z.string().min(50, {
    message: 'Job description must be at least 50 characters.',
  }),
  requirements: z.string().min(30, {
    message: 'Job requirements must be at least 30 characters.',
  }),
  keywords: z.array(z.object({ value: z.string(), label: z.string() })).min(1, {
    message: 'Please select at least one keyword.',
  }),
});

export type JobListingInput = z.infer<typeof jobListingSchema>;
