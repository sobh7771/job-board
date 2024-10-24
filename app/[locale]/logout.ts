'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { LuciaAuthRepository } from '@/infrastructure/auth/LuciaAuthRepository';
import { lucia } from '@/lib/auth/lucia';
import { publicActionClient } from '@/lib/safe-action';
import { CacheTags } from '@/lib/utils';

import { logoutUseCase } from './logoutUseCase';

export const logout = publicActionClient.action(async () => {
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
  revalidateTag(CacheTags.AUTHENTICATED_USER);

  return {
    success: 'You have been successfully logged out. Thank you for visiting!',
  };
});
