'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { LuciaAuthRepository } from '@/infrastructure/auth/LuciaAuthRepository';
import { DrizzleUserRepository } from '@/infrastructure/user/DrizzleUserRepository';
import { actionClient } from '@/lib/safe-action';
import { CacheTags } from '@/lib/utils';

import { loginSchema } from './loginSchema';
import { loginUserUseCase } from './loginUserUseCase';

const MESSAGES = {
  loginSuccess: 'Login successful! Welcome back!',
  loginFailure: 'Login failed. Please check your email and password.',
};

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const authRepository = new LuciaAuthRepository();
    const userRepository = new DrizzleUserRepository();

    const loginResult = await loginUserUseCase(
      parsedInput,
      userRepository,
      authRepository
    );

    if (loginResult.isErr()) {
      return {
        error: loginResult.error.message || MESSAGES.loginFailure,
      };
    }

    const sessionCookie = loginResult.value;

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attrs);
    revalidateTag(CacheTags.AUTHENTICATED_USER);

    return { success: MESSAGES.loginSuccess };
  });
