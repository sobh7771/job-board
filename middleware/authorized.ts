import { createSafeActionClient } from 'next-safe-action';

import { getUser } from '@/lib/auth/getUser';
import { Role } from '@/lib/drizzle/schema';

class InvalidSessionError extends Error {
  constructor(message: string = 'Invalid session!') {
    super(message);
    this.name = 'InvalidSessionError';
  }
}

class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized access!') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
export const action = createSafeActionClient({
  handleServerError(err: unknown) {
    let userFriendlyMessage = 'Oops! Something went wrong. Please try again later.';

    if (err instanceof InvalidSessionError) {
      userFriendlyMessage = 'Your session has expired. Please log in again to continue.';
    } else if (err instanceof UnauthorizedError) {
      userFriendlyMessage =
        "You don't have permission to access this part of the application. Please contact support if you believe this is an error.";
    }

    // Log the original error for debugging
    // console.error('Error:', err);

    // Return or display the user-friendly message
    return userFriendlyMessage;
  },
});

export const authorized = (requiredRoles: Role[]) => {
  return action.use<{ userId: string; role: Role }>(async ({ next }) => {
    const user = await getUser();

    if (!user || !user.id) {
      throw new InvalidSessionError();
    }

    const hasRequiredRole = requiredRoles.some((role) => user.role.includes(role));

    if (!hasRequiredRole) {
      throw new UnauthorizedError();
    }

    return next({
      ctx: { userId: user.id, role: user.role },
    });
  });
};
