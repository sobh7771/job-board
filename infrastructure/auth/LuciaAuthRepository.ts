import { lucia } from '@/lib/auth/lucia';

import {
  AuthRepository,
  Session,
  SessionCookie,
  SessionOptions,
  SessionValidationResult,
} from '../../domain/auth/AuthRepository';

export class LuciaAuthRepository implements AuthRepository {
  async createSession(userId: string, options: SessionOptions): Promise<Session> {
    const { id, fresh } = await lucia.createSession(userId, options);
    return { id, userId, fresh };
  }

  createSessionCookie(sessionId: string): SessionCookie {
    const sessionCookie = lucia.createSessionCookie(sessionId);
    return {
      name: sessionCookie.name,
      value: sessionCookie.value,
      attrs: sessionCookie.attributes,
    };
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await lucia.invalidateSession(sessionId);
  }

  createBlankSessionCookie(): SessionCookie {
    const blankSessionCookie = lucia.createBlankSessionCookie();
    return {
      name: blankSessionCookie.name,
      value: blankSessionCookie.value,
      attrs: blankSessionCookie.attributes,
    };
  }
  async validateSession(sessionId: string): Promise<SessionValidationResult> {
    let result = (await lucia.validateSession(sessionId)) as unknown as SessionValidationResult;
    return result;
  }
}
