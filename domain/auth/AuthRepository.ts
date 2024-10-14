import { Role } from '@/lib/drizzle/schema';

export interface Session {
  /**
   * The ID of the session.
   */
  id: string;

  /**
   * The ID of the user associated with the session.
   */
  userId: string;

  /**
   * Indicates whether the session is fresh (newly created).
   */
  fresh: boolean;
}

export interface SessionCookie {
  /**
   * The name of the cookie.
   */
  name: string;

  /**
   * The value of the cookie.
   */
  value: string;

  /**
   * Optional attributes for the cookie (e.g., expiration, path).
   */
  attrs?: object;
}

/**
 * Represents a user in the system.
 */
export interface User {
  /**
   * The ID of the user.
   */
  id: string;

  /**
   * The name of the user.
   */
  name: string;

  /**
   * The role of the user.
   */
  role: Role;
}

/**
 * Options that can be passed when creating a session.
 */
export interface SessionOptions {
  [key: string]: any;
}

/**
 * Result of session validation containing both session and user details.
 */
export interface SessionValidationResult {
  /**
   * The validated session.
   */
  session: Session | null;

  /**
   * The user associated with the validated session.
   */
  user: User | null;
}

/**
 * Interface for handling authentication-related operations.
 */
export interface AuthRepository {
  /**
   * Creates a new session for a given user.
   *
   * @param userId - The ID of the user for whom the session is being created.
   * @param options - Additional options for session creation.
   * @returns A promise that resolves with the created session.
   */
  createSession(userId: string, options: SessionOptions): Promise<Session>;

  /**
   * Creates a session cookie for the given session ID.
   *
   * @param sessionId - The ID of the session for which the cookie is being created.
   * @returns A session cookie object.
   */
  createSessionCookie(sessionId: string): SessionCookie;

  /**
   * Invalidates the given session by session ID.
   *
   * @param sessionId - The ID of the session to invalidate.
   * @returns A promise that resolves when the session is invalidated.
   */
  invalidateSession(sessionId: string): Promise<void>;

  /**
   * Creates a blank session cookie (e.g., to clear session data).
   *
   * @returns A blank session cookie object.
   */
  createBlankSessionCookie(): SessionCookie;

  /**
   * Validates the session and retrieves the session and associated user.
   *
   * @param sessionId - The ID of the session to validate.
   * @returns A promise that resolves with both the session and the associated user.
   */
  validateSession(sessionId: string): Promise<SessionValidationResult>;
}
