'use server';

import { revalidatePath } from 'next/cache';

import { Role } from '@/lib/drizzle/schema';
import { actionResponseSchema } from '@/lib/schemas/actionResponseSchema';
import { AppRoutes, HttpStatusCodes } from '@/lib/utils';
import { authorizedActionClient } from '@/middleware/authorized';

import { createJobListingUseCase } from './createJobListingUseCase';
import { jobListingSchema } from './jobListingSchema';

export const createJobListingAction = authorizedActionClient([Role.EMPLOYER])
  .schema(jobListingSchema)
  .outputSchema(actionResponseSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    const result = await createJobListingUseCase(parsedInput, userId);

    if (result.isErr()) {
      return {
        error: `Failed to create job listing: ${result.error.message}`,
        statusCode: HttpStatusCodes.BAD_REQUEST,
      };
    }

    revalidatePath(AppRoutes.Jobs);

    return {
      success: 'Job listing created successfully!',
      statusCode: HttpStatusCodes.CREATED,
    };
  });
