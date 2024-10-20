import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);
// const authRepository = new LuciaAuthRepository();

export default async function middleware(request: NextRequest) {
  // if (request.method === 'GET') {
  //   const sessionId =
  //     request.cookies.get(lucia.sessionCookieName)?.value ?? null;

  //   if (sessionId) {
  //     const cookie = authRepository.createSessionCookie(sessionId);
  //     cookies().set(cookie.name, cookie.value, cookie.attrs);
  //   }
  // }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*'],
};
