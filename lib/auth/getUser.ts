import { cookies } from 'next/headers';

import getUserUseCase from '../../domain/auth/getUserUseCase';
import { LuciaAuthRepository } from '../../infrastructure/auth/LuciaAuthRepository';
import { lucia } from './lucia';

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  if (!sessionId) {
    return null;
  }

  const authRepository = new LuciaAuthRepository();

  try {
    const user = await getUserUseCase(sessionId, authRepository);
    return user;
  } catch (error) {
    console.error('Failed to retrieve user:', error);
    return null;
  }
};
