import { err } from 'neverthrow';

import { jobListingFilterSchema } from '@/domain/job-listing/JobListingFilterSchema';
import { JobListingFilter } from '@/domain/job-listing/JobListingRepository';
import { toUserDTO } from '@/domain/user/userDTOSchema';
import { DrizzleJobListingRepository } from '@/infrastructure/job-listing/DrizzleJobListingRepository';

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message || 'Validation failed');
    this.name = 'ValidationError';
  }
}

export const getJobListingsWithEmployers = async (
  filterInput: JobListingFilter
) => {
  const parsedFilter = jobListingFilterSchema.safeParse(filterInput);

  if (!parsedFilter.success) {
    return err(new ValidationError('Invalid filter input'));
  }

  const jobListingRepository = new DrizzleJobListingRepository();
  const result = await jobListingRepository.getJobListingsWithEmployers(
    parsedFilter.data
  );

  return result.map(jobListings =>
    jobListings.map(jobListing => ({
      ...jobListing,
      employer: toUserDTO(jobListing.employer),
    }))
  );
};
