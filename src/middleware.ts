import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check either cookie — userRole is set by the mock login; accessToken by the real one
  const isLoggedIn =
    request.cookies.has('userRole') || request.cookies.has('accessToken');

  if (!isLoggedIn) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/loans/:path*',
    '/dashboard/member/savings/:path*',
    '/withdraw/:path*',
  ],
};
