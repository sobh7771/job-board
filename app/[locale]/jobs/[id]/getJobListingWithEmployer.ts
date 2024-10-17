import { err } from 'neverthrow';
import { z } from 'zod';

import { toUserDTO } from '@/domain/user/userDTOSchema';
import { DrizzleJobListingRepository } from '@/infrastructure/job-listing/DrizzleJobListingRepository';

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message || 'Validation failed');
    this.name = 'ValidationError';
  }
}

export const singleJobListingSchema = z.object({
  id: z.string().uuid(),
});

export type SingleJobListingFilter = z.infer<typeof singleJobListingSchema>;

export const getJobListingWithEmployer = async (
  filterInput: SingleJobListingFilter
) => {
  const parsedFilter = singleJobListingSchema.safeParse(filterInput);

  if (!parsedFilter.success) {
    const errorMessage = parsedFilter.error.format();
    return err(
      new ValidationError(`Validation failed: ${JSON.stringify(errorMessage)}`)
    );
  }

  const jobListingRepository = new DrizzleJobListingRepository();
  const result = await jobListingRepository.getJobListingWithEmployer(
    parsedFilter.data
  );

  return result.map(jobListing => ({
    ...jobListing,
    employer: toUserDTO(jobListing.employer),
  }));
};
