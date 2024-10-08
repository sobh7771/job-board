'use server';

import { cookies } from 'next/headers';

import { LuciaAuthRepository } from '@/infrastructure/auth/LuciaAuthRepository';
import { lucia } from '@/lib/auth/lucia';
import { actionClient } from '@/lib/safe-action';

import { logoutUseCase } from './logoutUseCase';

export const logout = actionClient.action(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;

  if (!sessionId) {
    return { error: 'No active session found. Please log in to continue.' };
  }

  const authRepository = new LuciaAuthRepository();
  const result = await logoutUseCase(sessionId, authRepository);

  if (result.isErr()) {
    return { error: `Logout failed: ${result.error.message}` };
  }

  // Set the blank session cookie
  const sessionCookie = result.value;
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attrs);

  return { success: 'You have been successfully logged out. Thank you for visiting!' };
});
