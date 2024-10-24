import { and, asc, count, desc, eq, gt, like, lt } from 'drizzle-orm';
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
  SortCriteria,
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
    filter?: JobListingFilter, // Make filter optional
    sortBy?: SortCriteria,
    page: number = 1, // Default to page 1
    perPage: number = 10 // Default to 10 items per page
  ): Promise<Result<JobListingWithEmployer[], JobListingFetchError>> {
    // Use Math.max to enforce minimum values for page and perPage
    page = Math.max(page, 1);
    perPage = Math.max(perPage, 1);

    return await ResultAsync.fromPromise(
      db
        .select({
          jobListing: jobListingTable,
          employer: userTable,
        })
        .from(jobListingTable)
        .where(this.buildFilterQuery(filter)) // Call buildFilterQuery with optional filter
        .leftJoin(userTable, eq(jobListingTable.userId, userTable.id))
        .orderBy(...this.buildSortQuery(sortBy))
        .limit(perPage) // Limit to items per page
        .offset((page - 1) * perPage) // Calculate offset for pagination
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
    filter?: JobListingFilter, // Make filter optional
    sortBy?: SortCriteria
  ): Promise<Result<JobListing[], JobListingFetchError>> {
    return ResultAsync.fromPromise(
      db
        .select()
        .from(jobListingTable)
        .where(this.buildFilterQuery(filter)) // Call buildFilterQuery with optional filter
        .orderBy(...this.buildSortQuery(sortBy))
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
    filter?: JobListingFilter // Make filter optional
  ): Promise<Result<number, JobListingFetchError>> {
    return ResultAsync.fromPromise(
      db
        .select({ count: count() })
        .from(jobListingTable)
        .where(this.buildFilterQuery(filter)) // Call buildFilterQuery with optional filter
        .execute()
        .then(result => (result.length > 0 ? result[0].count : 0)),
      () => new JobListingFetchError()
    );
  }

  private buildFilterQuery(filter?: JobListingFilter) {
    // Make filter optional
    const conditions = [];

    if (filter) {
      // Check if filter is provided
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
    }

    return conditions.length > 0 ? and(...conditions) : undefined; // Return undefined if no conditions
  }

  private buildSortQuery(sortBy?: SortCriteria) {
    const sortConditions = [];

    if (sortBy) {
      for (const criterion of sortBy) {
        switch (criterion.field) {
          case 'title':
            sortConditions.push(
              criterion.order === 'desc'
                ? desc(jobListingTable.title)
                : asc(jobListingTable.title)
            );
            break;
          case 'createdAt':
            sortConditions.push(
              criterion.order === 'desc'
                ? desc(jobListingTable.createdAt)
                : asc(jobListingTable.createdAt)
            );
            break;
          case 'status':
            sortConditions.push(
              criterion.order === 'desc'
                ? desc(jobListingTable.status)
                : asc(jobListingTable.status)
            );
            break;
        }
      }
    }

    if (sortConditions.length === 0) {
      sortConditions.push(desc(jobListingTable.createdAt));
    }

    return sortConditions;
  }
}
