/**
 * Error thrown when fetching job listings fails.
 */
class JobListingFetchError extends Error {
  constructor() {
    super('Failed to fetch job listings');
    this.name = 'JobListingFetchError';
  }
}
/**
 * Error thrown when a job listing cannot be saved to the repository.
 */
class JobListingSaveError extends Error {
  constructor() {
    super('Failed to save job listing');
    this.name = 'JobListingSaveError';
  }
}
export { JobListingFetchError, JobListingSaveError };
