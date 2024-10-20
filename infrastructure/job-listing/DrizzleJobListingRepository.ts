import { and, count, eq, gt, like, lt } from 'drizzle-orm';
import { Result, ResultAsync } from 'neverthrow';

import { SingleJobListingFilter } from '@/app/[locale]/jobs/[id]/getJobListingWithEmployer';
import {
  JobListingFetchError,
  JobListingSaveError,
} from '@/domain/job-listing/JobListingErrors';
import {
  JobListingFilter,
  JobListingRepository,
  JobListingWithEmployer,
} from '@/domain/job-listing/JobListingRepository';
import { db } from '@/lib/drizzle/db';
import { JobListing, jobListingTable, userTable } from '@/lib/drizzle/schema';

export class DrizzleJobListingRepository implements JobListingRepository {
  async getJobListingWithEmployer(
    filter: SingleJobListingFilter
  ): Promise<Result<JobListingWithEmployer, JobListingFetchError>> {
    return await ResultAsync.fromPromise(
      db
        .select({
          jobListing: jobListingTable,
          employer: userTable,
        })
        .from(jobListingTable)
        .where(eq(jobListingTable.id, filter.id))
        .leftJoin(userTable, eq(jobListingTable.userId, userTable.id))
        .execute()
        .then(result => {
          const res = result[0];
          return {
            ...res.jobListing,
            employer: res.employer!,
          };
        }),
      () => new JobListingFetchError()
    );
  }

  async getJobListingsWithEmployers(
    filter: JobListingFilter
  ): Promise<Result<JobListingWithEmployer[], JobListingFetchError>> {
    return await ResultAsync.fromPromise(
      db
        .select({
          jobListing: jobListingTable,
          employer: userTable,
        })
        .from(jobListingTable)
        .where(this.buildFilterQuery(filter))
        .leftJoin(userTable, eq(jobListingTable.userId, userTable.id))
        .execute()
        .then(result =>
          result.map(res => ({
            ...res.jobListing,
            employer: res.employer!,
          }))
        ),
      () => new JobListingFetchError()
    );
  }

  async fetchById(
    filter: SingleJobListingFilter
  ): Promise<Result<JobListing | null, JobListingFetchError>> {
    return ResultAsync.fromPromise(
      db
        .select()
        .from(jobListingTable)
        .where(eq(jobListingTable.id, filter.id))
        .execute()
        .then(result => (result.length > 0 ? (result[0] as JobListing) : null)),
      () => new JobListingFetchError()
    );
  }

  async fetchAll(
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
      conditions.push(lt(jobListingTable.createdAt, filter.createdAtBefore));
    }
    if (filter.createdAtAfter) {
      conditions.push(gt(jobListingTable.createdAt, filter.createdAtAfter));
    }

    return conditions.length > 0 ? and(...conditions) : undefined;
  }
}
