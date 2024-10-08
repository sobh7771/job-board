'use server';

import { cookies } from 'next/headers';

import { LuciaAuthRepository } from '@/infrastructure/auth/LuciaAuthRepository';
import { UserRepositoryImpl } from '@/infrastructure/user/UserRepositoryImpl';
import { actionClient } from '@/lib/safe-action';

import { registerSchema } from './registerSchema';
import { registerUserUseCase } from './registerUserUseCase';

// User-friendly messages
const MESSAGES = {
  registrationSuccess: 'Registration successful! Welcome aboard!',
  registrationFailure: 'Registration failed. Please check your details and try again.',
};

// Main registration action
export const register = actionClient.schema(registerSchema).action(async ({ parsedInput }) => {
  const authRepository = new LuciaAuthRepository();
  const userRepository = new UserRepositoryImpl();

  // Attempt to register the user
  const registrationResult = await registerUserUseCase(parsedInput, userRepository, authRepository);

  if (registrationResult.isErr()) {
    return {
      error: registrationResult.error.message || MESSAGES.registrationFailure,
    };
  }

  const sessionCookie = registrationResult.value;

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attrs);

  return { success: MESSAGES.registrationSuccess };
});
