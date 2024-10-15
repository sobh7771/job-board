import { and, count, eq, gt, like, lt } from 'drizzle-orm';
import { Result, ResultAsync } from 'neverthrow';

import {
  JobListingFetchError,
  JobListingSaveError,
} from '@/domain/job-listing/JobListingErrors';
import {
  JobListingFilter,
  JobListingRepository,
} from '@/domain/job-listing/JobListingRepository';
import { db } from '@/lib/drizzle/db';
import { JobListing, jobListingTable } from '@/lib/drizzle/schema';

export class DrizzleJobListingRepository implements JobListingRepository {
  async find(
    filter: JobListingFilter
  ): Promise<Result<JobListing | null, JobListingFetchError>> {
    return ResultAsync.fromPromise(
      db
        .select()
        .from(jobListingTable)
        .where(this.buildFilterQuery(filter))
        .execute()
        .then(result => (result.length > 0 ? (result[0] as JobListing) : null)),
      () => new JobListingFetchError()
    );
  }

  async findMany(
    filter: JobListingFilter
  ): Promise<Result<JobListing[], JobListingFetchError>> {
    return ResultAsync.fromPromise(
      db
        .select()
        .from(jobListingTable)
        .where(this.buildFilterQuery(filter))
        .execute()
        .then(result => result as JobListing[]),
      () => new JobListingFetchError()
    );
  }

  async save(
    jobListing: JobListing
  ): Promise<Result<void, JobListingSaveError>> {
    return ResultAsync.fromPromise(
      db.insert(jobListingTable).values(jobListing).execute(),
      () => new JobListingSaveError()
    ).map(() => undefined);
  }

  async count(
    filter: JobListingFilter
  ): Promise<Result<number, JobListingFetchError>> {
    return ResultAsync.fromPromise(
      db
        .select({ count: count() })
        .from(jobListingTable)
        .where(this.buildFilterQuery(filter))
        .execute()
        .then(result => (result.length > 0 ? result[0].count : 0)),
      () => new JobListingFetchError()
    );
  }

  private buildFilterQuery(filter: JobListingFilter) {
    const conditions = [];

    if (filter.userId) {
      conditions.push(eq(jobListingTable.userId, filter.userId));
    }
    if (filter.status) {
      conditions.push(eq(jobListingTable.status, filter.status));
    }
    if (filter.title) {
      conditions.push(like(jobListingTable.title, `%${filter.title}%`));
    }
    if (filter.createdAtBefore) {
      conditions.push(
        lt(jobListingTable.createdAt, filter.createdAtBefore.getTime())
      );
    }
    if (filter.createdAtAfter) {
      conditions.push(
        gt(jobListingTable.createdAt, filter.createdAtAfter.getTime())
      );
    }

    return conditions.length > 0 ? and(...conditions) : undefined;
  }
}
