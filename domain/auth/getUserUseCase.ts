import 'server-only';

import { cookies } from 'next/headers';

import { AuthRepository } from './AuthRepository';

const getUserUseCase = async (sessionId: string, authRepository: AuthRepository) => {
  const { user, session } = await authRepository.validateSession(sessionId);

  try {
    if (session?.fresh) {
      const sessionCookie = authRepository.createSessionCookie(sessionId);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attrs);
    } else if (!session) {
      const blankSessionCookie = authRepository.createBlankSessionCookie();
      cookies().set(blankSessionCookie.name, blankSessionCookie.value, blankSessionCookie.attrs);
    }
  } catch (err) {
    console.error('Error validating session:', err);
  }

  return user;
};

export default getUserUseCase;
