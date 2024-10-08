'use server';

import { cookies } from 'next/headers';

import { LuciaAuthRepository } from '@/infrastructure/auth/LuciaAuthRepository';
import { UserRepositoryImpl } from '@/infrastructure/user/UserRepositoryImpl';
import { actionClient } from '@/lib/safe-action';

import { loginSchema } from './loginSchema';
import { loginUserUseCase } from './loginUserUseCase';

const MESSAGES = {
  loginSuccess: 'Login successful! Welcome back!',
  loginFailure: 'Login failed. Please check your email and password.',
};

export const login = actionClient.schema(loginSchema).action(async ({ parsedInput }) => {
  const authRepository = new LuciaAuthRepository();
  const userRepository = new UserRepositoryImpl();

  const loginResult = await loginUserUseCase(parsedInput, userRepository, authRepository);

  if (loginResult.isErr()) {
    return {
      error: loginResult.error.message || MESSAGES.loginFailure,
    };
  }

  const sessionCookie = loginResult.value;

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attrs);

  return { success: MESSAGES.loginSuccess };
});
