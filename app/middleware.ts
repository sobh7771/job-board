import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware');
  // Middleware logic here
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/about", "/dashboard/:path*"],
// };
