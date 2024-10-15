import { ok, ResultAsync } from 'neverthrow';

import { AuthRepository } from '@/domain/auth/AuthRepository';

class LogoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LogoutError';
  }
}

export const logoutUseCase = async (
  sessionId: string,
  authRepository: AuthRepository
) => {
  const invalidateResult = await ResultAsync.fromPromise(
    authRepository.invalidateSession(sessionId),
    () => new LogoutError('Failed to invalidate session')
  );

  if (invalidateResult.isErr()) {
    return invalidateResult;
  }

  const blankSessionCookie = authRepository.createBlankSessionCookie();

  return ok(blankSessionCookie);
};
