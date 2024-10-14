import { Result } from 'neverthrow';

import { JobListing, JobListingStatus } from '@/lib/drizzle/schema';

import { JobListingFetchError, JobListingSaveError } from './JobListingErrors';

/**
 * Filters that can be applied to find job listings.
 */
interface JobListingFilter {
  userId?: string;
  status?: JobListingStatus;
  title?: string;
  createdAtBefore?: Date;
  createdAtAfter?: Date;
}

/**
 * JobListingRepository interface defining methods for job listing data access.
 */
export interface JobListingRepository {
  /**
   * Finds a single job listing based on flexible filter criteria.
   * @param filter - The filter object to apply (e.g., userId, status, title).
   * @returns A promise that resolves to a Result containing a single JobListing or null if not found, and a JobListingFetchError on failure.
   */
  find(filter: JobListingFilter): Promise<Result<JobListing | null, JobListingFetchError>>;

  /**
   * Finds multiple job listings based on flexible filter criteria.
   * @param filter - The filter object to apply (e.g., userId, status, title).
   * @returns A promise that resolves to a Result containing an array of JobListing or an empty array if none found, and a JobListingFetchError on failure.
   */
  findMany(filter: JobListingFilter): Promise<Result<JobListing[], JobListingFetchError>>;

  /**
   * Saves a job listing to the repository.
   * @param jobListing - The JobListing object to save.
   * @returns A promise that resolves to a Result indicating success or failure, with a JobListingSaveError on failure.
   */
  save(jobListing: JobListing): Promise<Result<void, JobListingSaveError>>;

  /**
   * Counts the number of job listings matching the filter criteria.
   * @param filter - The filter object to apply (e.g., userId, status, title).
   * @returns A promise that resolves to the count of matching job listings.
   */
  count(filter: JobListingFilter): Promise<Result<number, JobListingFetchError>>;
}

export { type JobListingFilter };
