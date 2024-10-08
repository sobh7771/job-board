import bcrypt from 'bcrypt';
import { generateIdFromEntropySize } from 'lucia';
import { err, ok, ResultAsync } from 'neverthrow';

import { AuthRepository } from '@/domain/auth/AuthRepository';
import { PasswordHashingError, SessionCreationError } from '@/lib/auth/types';
import { User } from '@/lib/drizzle/schema';

import { UserRepository } from '../../../domain/user/UserRepository';
import { RegisterUserInput } from './registerSchema';

// Main use case for registering a user
export const registerUserUseCase = async (
  input: RegisterUserInput,
  userRepository: UserRepository,
  authRepository: AuthRepository,
) => {
  // Check for existing user
  const existingUserResult = await userRepository.findByEmail(input.email);
  if (existingUserResult.isErr()) {
    return err(new UserRepositoryError(existingUserResult.error.message));
  }

  if (existingUserResult.value) {
    return err(new UserAlreadyExistsError());
  }

  // Hash the password
  const passwordHashResult = await ResultAsync.fromPromise(
    bcrypt.hash(input.password, await bcrypt.genSalt()),
    () => new PasswordHashingError(),
  );
  if (passwordHashResult.isErr()) {
    return err(new PasswordHashingError());
  }

  // Create the user object
  const user: User = {
    id: generateIdFromEntropySize(10),
    email: input.email,
    name: input.name,
    password: passwordHashResult.value,
    role: input.role,
  };

  // Save the user to the repository
  const saveResult = await userRepository.save(user);
  if (saveResult.isErr()) {
    return err(new UserRepositoryError(saveResult.error.message));
  }

  // Create a new session for the user
  const sessionResult = await ResultAsync.fromPromise(
    authRepository.createSession(user.id, { fresh: true }),
    () => new SessionCreationError(),
  );

  if (sessionResult.isErr()) {
    return err(new SessionCreationError());
  }

  // Create session cookie
  const sessionCookie = authRepository.createSessionCookie(sessionResult.value.id);

  return ok(sessionCookie);
};

// Custom error classes for better context
class UserAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists');
    this.name = 'UserAlreadyExistsError';
  }
}

class UserRepositoryError extends Error {
  constructor(message: string) {
    super(`User repository error: ${message}`);
    this.name = 'UserRepositoryError';
  }
}
