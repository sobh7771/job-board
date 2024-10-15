import { err, ok, Result } from 'neverthrow';

import { JobListingSaveError } from '@/domain/job-listing/JobListingErrors';
import { DrizzleJobListingRepository } from '@/infrastructure/job-listing/DrizzleJobListingRepository';
import { JobListing } from '@/lib/drizzle/schema';

import { JobListingInput } from './jobListingSchema';

export const createJobListingUseCase = async (
  jobInput: JobListingInput,
  userId: string
): Promise<Result<void, JobListingSaveError>> => {
  const newJobListing: JobListing = {
    ...jobInput,
    userId,
    createdBy: userId,
    updatedBy: userId,
  };

  const jobListingRepository = new DrizzleJobListingRepository();

  const saveResult = await jobListingRepository.save(newJobListing);

  if (saveResult.isErr()) {
    return err(new JobListingSaveError());
  }

  return ok(saveResult.value);
};
