import bcrypt from 'bcrypt';
import { err, ok, ResultAsync } from 'neverthrow';

import { AuthRepository } from '@/domain/auth/AuthRepository';
import { PasswordHashingError, SessionCreationError } from '@/lib/auth/types';

import { UserRepository } from '../../../domain/user/UserRepository';
import { LoginUserInput } from './loginSchema';

const ERROR_MESSAGES = {
  invalidCredentials: 'Invalid email or password.',
};

export const loginUserUseCase = async (
  input: LoginUserInput,
  userRepository: UserRepository,
  authRepository: AuthRepository,
) => {
  const existingUserResult = await userRepository.findByEmail(input.email);
  if (existingUserResult.isErr() || !existingUserResult.value) {
    return err(new InvalidCredentialsError(ERROR_MESSAGES.invalidCredentials));
  }

  const passwordMatchResult = await ResultAsync.fromPromise(
    bcrypt.compare(input.password, existingUserResult.value.password),
    () => new PasswordHashingError(),
  );

  if (passwordMatchResult.isErr() || !passwordMatchResult.value) {
    return err(new InvalidCredentialsError(ERROR_MESSAGES.invalidCredentials));
  }

  const sessionResult = await ResultAsync.fromPromise(
    authRepository.createSession(existingUserResult.value.id, { fresh: true }),
    () => new SessionCreationError(),
  );

  if (sessionResult.isErr()) {
    return err(new SessionCreationError());
  }

  const sessionCookie = authRepository.createSessionCookie(sessionResult.value.id);

  return ok(sessionCookie);
};

class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}
