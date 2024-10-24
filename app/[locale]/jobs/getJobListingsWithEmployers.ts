'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { jobListingFilterSchema } from '@/domain/job-listing/JobListingFilterSchema';
import { SortCriteriaSchema } from '@/domain/job-listing/JobListingRepository';
import { toUserDTO } from '@/domain/user/userDTOSchema';
import { DrizzleJobListingRepository } from '@/infrastructure/job-listing/DrizzleJobListingRepository';
import { publicActionClient } from '@/lib/safe-action';
import { successResponseSchema } from '@/lib/schemas/actionResponseSchema';
import { AppRoutes, HttpStatusCodes } from '@/lib/utils';

export const getJobListingsWithEmployers = publicActionClient
  .schema(
    z.object({
      filterInput: jobListingFilterSchema.optional(),
      sortBy: SortCriteriaSchema.optional(),
      page: z.number().optional().default(1),
      perPage: z.number().optional().default(10),
    })
  )
  .outputSchema(successResponseSchema)
  .action(async ({ parsedInput }) => {
    const { filterInput, sortBy, page, perPage } = parsedInput;

    const jobListingRepository = new DrizzleJobListingRepository();

    const jobListingsResult =
      await jobListingRepository.getJobListingsWithEmployers(
        filterInput,
        sortBy,
        Math.max(page, 1),
        Math.max(perPage, 1)
      );

    const totalCountResult = await jobListingRepository.count(filterInput);

    if (jobListingsResult.isErr()) {
      throw new Error(
        `Failed to retrieve job listings: ${jobListingsResult.error.message}`
      );
    }

    if (totalCountResult.isErr()) {
      throw new Error(
        `Failed to retrieve total count: ${totalCountResult.error.message}`
      );
    }

    const totalCount = totalCountResult.value;

    const jobListings = jobListingsResult.value.map(jobListing => ({
      ...jobListing,
      employer: toUserDTO(jobListing.employer),
    }));

    revalidatePath(AppRoutes.Jobs);

    const nextPage = page * perPage < totalCount ? page + 1 : null;

    return {
      data: {
        jobListings,
        totalCount,
        nextPage,
      },
      success: 'Job listings retrieved successfully!',
      statusCode: HttpStatusCodes.OK,
    };
  });
