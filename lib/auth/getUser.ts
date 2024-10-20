import { cookies } from 'next/headers';

import { LuciaAuthRepository } from '../../infrastructure/auth/LuciaAuthRepository';
import { lucia } from './lucia';

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  if (!sessionId) {
    return null;
  }

  const authRepository = new LuciaAuthRepository();

  try {
    const { user } = await authRepository.validateSession(sessionId);
    return user;
  } catch (error) {
    console.error('Failed to validate session:', error);
    return null;
  }
};
