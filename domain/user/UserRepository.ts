import { Result } from 'neverthrow';

import { User } from '@/lib/drizzle/schema';

// Custom error types for repository operations

/**
 * Error thrown when a user cannot be found by email.
 */
class UserNotFoundError extends Error {
  constructor() {
    super('Failed to find user by email');
    this.name = 'UserNotFoundError';
  }
}

/**
 * Error thrown when a user cannot be saved to the repository.
 */
class UserSaveError extends Error {
  constructor() {
    super('Failed to save user');
    this.name = 'UserSaveError';
  }
}

/**
 * UserRepository interface defining methods for user data access.
 */
export interface UserRepository {
  /**
   * Finds a user by their email.
   * @param email - The email of the user to find.
   * @returns A promise that resolves to a Result containing the User or null if not found, and a UserNotFoundError on failure.
   */
  findByEmail(email: string): Promise<Result<User | null, UserNotFoundError>>;

  /**
   * Saves a user to the repository.
   * @param user - The User object to save.
   * @returns A promise that resolves to a Result indicating success or failure, with a UserSaveError on failure.
   */
  save(user: User): Promise<Result<void, UserSaveError>>;
}

export { UserNotFoundError, UserSaveError };
