'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { LuciaAuthRepository } from '@/infrastructure/auth/LuciaAuthRepository';
import { DrizzleUserRepository } from '@/infrastructure/user/DrizzleUserRepository';
import { publicActionClient } from '@/lib/safe-action';
import { CacheTags } from '@/lib/utils';

import { registerSchema } from './registerSchema';
import { registerUserUseCase } from './registerUserUseCase';

// User-friendly messages
const MESSAGES = {
  registrationSuccess: 'Registration successful! Welcome aboard!',
  registrationFailure:
    'Registration failed. Please check your details and try again.',
};

// Main registration action
export const register = publicActionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    const authRepository = new LuciaAuthRepository();
    const userRepository = new DrizzleUserRepository();

    // Attempt to register the user
    const registrationResult = await registerUserUseCase(
      parsedInput,
      userRepository,
      authRepository
    );

    if (registrationResult.isErr()) {
      return {
        error: registrationResult.error.message || MESSAGES.registrationFailure,
      };
    }

    const sessionCookie = registrationResult.value;

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attrs);
    revalidateTag(CacheTags.AUTHENTICATED_USER);

    return { success: MESSAGES.registrationSuccess };
  });
