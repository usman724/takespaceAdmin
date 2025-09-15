import { NextResponse } from 'next/server';

// Public paths that don't require auth
const PUBLIC_PATHS = new Set([
  '/',
  '/login',
  '/auth',
  '/api',
]);

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (PUBLIC_PATHS.has(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/public') || pathname.startsWith('/images') || pathname.startsWith('/icons')) {
    return NextResponse.next();
  }

  // Check token from cookies or headers is cumbersome; since we store in web storage,
  // we fallback to a cookie that pages can set on login if needed in future.
  // For now, redirect to /login and let client-side guard handle storage.
  const token = req.cookies.get('access_token');
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};


