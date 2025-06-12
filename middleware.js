import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Define protected routes that require authentication
const protectedRoutes = ['/checkout', '/account', '/wholesale-store'];
// Define auth routes that should not be accessible when logged in
const authRoutes = ['/login', '/register', '/wholesaler-registration'];

// Create the internationalization middleware
const intlMiddleware = createMiddleware(routing);

// Combine internationalization with route protection
export default async function middleware(request) {
  // First, handle internationalization
  const response = await intlMiddleware(request);

  // If the response is a redirect, return it immediately
  if (response.headers.get('location')) {
    return response;
  }

  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('authToken')?.value;

  // Remove locale prefix from pathname for route checking
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');

  // Check if user is trying to access a protected route without being logged in
  if (protectedRoutes.some((route) => pathnameWithoutLocale.startsWith(route))) {
    if (!authToken) {
      console.log('Access denied: No auth token found for protected route:', pathname);
      const url = new URL('/login', request.url);
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }

    // Special handling for wholesale store route
    if (pathnameWithoutLocale.startsWith('/wholesale-store')) {
      try {
        // Decode the JWT token to get user info
        const tokenPayload = JSON.parse(atob(authToken.split('.')[1]));

        // Check if user is a wholesaler and has active status
        if (tokenPayload.role !== 'wholesaler' || tokenPayload.status !== 'Active') {
          console.log('Access denied: User is not an active wholesaler');
          return NextResponse.redirect(new URL('/wholesaler-registration', request.url));
        }
      } catch (error) {
        console.error('Error decoding auth token:', error);
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  // Check if logged-in user is trying to access auth routes
  if (authRoutes.some((route) => pathnameWithoutLocale.startsWith(route))) {
    if (authToken) {
      console.log('Redirecting logged-in user from auth route:', pathname);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

// import createMiddleware from 'next-intl/middleware';
// import { NextResponse } from 'next/server';
// import { routing } from './i18n/routing';

// // Define protected routes that require authentication
// const protectedRoutes = ['/checkout', '/account'];
// // Define auth routes that should not be accessible when logged in
// const authRoutes = ['/login', '/register'];

// // Create the internationalization middleware
// const intlMiddleware = createMiddleware(routing);

// // Combine internationalization with route protection
// export default async function middleware(request) {
//   // First, handle internationalization
//   const response = await intlMiddleware(request);

//   // If the response is a redirect, return it immediately
//   if (response.headers.get('location')) {
//     return response;
//   }

//   const { pathname } = request.nextUrl;
//   const authToken = request.cookies.get('authToken')?.value;

//   // Remove locale prefix from pathname for route checking
//   const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');

//   // Check if user is trying to access a protected route without being logged in
//   if (protectedRoutes.some((route) => pathnameWithoutLocale.startsWith(route))) {
//     if (!authToken) {
//       console.log('Access denied: No auth token found for protected route:', pathname);
//       const url = new URL('/login', request.url);
//       url.searchParams.set('from', pathname);
//       return NextResponse.redirect(url);
//     }
//   }

//   // Check if logged-in user is trying to access auth routes
//   if (authRoutes.some((route) => pathnameWithoutLocale.startsWith(route))) {
//     if (authToken) {
//       console.log('Redirecting logged-in user from auth route:', pathname);
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   }

//   return response;
// }

// export const config = {
//   // Match all pathnames except for
//   // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
//   // - … the ones containing a dot (e.g. `favicon.ico`)
//   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
// };
