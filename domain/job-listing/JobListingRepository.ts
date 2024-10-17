import { Result } from 'neverthrow';

import { SingleJobListingFilter } from '@/app/[locale]/jobs/[id]/getJobListingWithEmployer';
import { JobListing, User } from '@/lib/drizzle/schema';

import { UserDTO } from '../user/userDTOSchema';
import { JobListingFetchError, JobListingSaveError } from './JobListingErrors';
import { JobListingFilter } from './JobListingFilterSchema';

export type JobListingWithEmployer = JobListing & {
  employer: User;
};

export type JobListingWithEmployerDTO = JobListing & {
  employer: UserDTO;
};

export type JobListingRepository = {
  count(
    filter: JobListingFilter
  ): Promise<Result<number, JobListingFetchError>>;

  fetchById(
    filter: SingleJobListingFilter
  ): Promise<Result<JobListing | null, JobListingFetchError>>;

  fetchAll(
    filter: JobListingFilter
  ): Promise<Result<JobListing[], JobListingFetchError>>;

  getJobListingWithEmployer(
    filter: SingleJobListingFilter
  ): Promise<Result<JobListingWithEmployer, JobListingFetchError>>;

  getJobListingsWithEmployers(
    filter: JobListingFilter
  ): Promise<Result<JobListingWithEmployer[], JobListingFetchError>>;

  save(jobListing: JobListing): Promise<Result<void, JobListingSaveError>>;
};

export { type JobListingFilter };
