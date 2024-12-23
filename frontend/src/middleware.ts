import type { NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  
  if (session?.user && !request.nextUrl.pathname.startsWith('/')) {
    return Response.redirect(new URL('/', request.url));
  }

  if (!session?.user && !request.nextUrl.pathname.startsWith('/api/auth/login')) {
    return Response.redirect(new URL('/api/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/about/:path*', '/projects/:path*', '/organizations/:path*'],
}
