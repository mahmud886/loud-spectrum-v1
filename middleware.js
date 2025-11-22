import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Define protected routes that require authentication
const protectedRoutes = ['/account', '/wholesale-store'];
// Define auth routes that should not be accessible when logged in
// const authRoutes = ['/login', '/register', '/wholesale-registration'];
const authRoutes = ['/login', '/register'];

// Define removed URLs that should return 404
const removedUrls = [
  '/en/products',
  '/en/shop/sweet watermelon',
  '/en/shop/alive/alive-pine-walker-1756211568560',
  '/en/shop/classic/classic-mochas',
  '/en/shop/Relax',
  '/en/shop/alive/alive-mac-1-flower',
  '/en/shop/alive/alive-gatsby-1756210750936',
  '/en/shop/classic blue dream',
  '/en/shop/dank green crack',
  '/en/shop/classic-sinmint',
  '/en/shop/sweet strawberry ice',
  '/en/shop/alive/alive-lifter-1756211309503',
  '/en/shop/classic/classic-gsc-18c',
  '/en/shop/alive/alive-garlicane-flower',
  '/en/shop/classic-berry-blast',
  '/en/blog/Odio exercitation op',
  '/en/shop/alive-mimosa-flower',
  '/en/shop/alive/alive-orez',
  '/en/shop/classic/classic-green-apple',
  '/en/shop/alive sour haze',
  '/en/shop/dank-true-og',
  '/en/shop/dank/dank-bubble-gum',
  '/en/blog/690f672af5f83d4f9af9a59d',
  '/en/shop/dank trainwreck',
  '/en/products/679e4ebf2d8751f02316af02',
  '/en/shop/dank watermelon og',
  '/en/shop/dank skywalker og',
  '/en/shop/dank-cucumber',
  '/en/shop/classic top 5 1752584196554',
  '/en/shop/dank top 5 1752584087649',
  '/en/shop/classic-mochas',
  '/en/shop/medical terpenes',
  '/en/shop/alive/alive-mimosa-flower',
  '/en/shop/dank sour diesel',
  '/en/shop/dank wild mountain pomegranate',
  '/en/other/terms',
  '/en/shop/sample-packs/alive-top-5-1752583525838',
  '/en/shop/sample-packs/classic-top-5-1752584196554',
  '/en/shop/classic/classic-chocolate-milk',
  '/en/shop/dank/dank-chocolate-milk',
  '/en/blogs/68373644b39ecda94e841ad3',
  '/en/shop/alive/alive-gsc-1752334771316',
  '/en/shop/classic true og',
  '/en/shop/dank-ak-47',
  '/en/shop/classic-berry-bliss',
  '/en/shop/sample-packs/dank-top-5-1752584087649',
  '/en/shop/alive-lifter',
  '/en/shop/alive/alive-la-confidential-1752336263913',
  '/en/blog/Nisi soluta ea iusto',
  '/en/shop/dank-blackberry-Kush-(BBK)',
  '/en/shop/alive-gatsby',
  '/en/shop/sweet-watermelon-slushy',
  '/en/shop/dank-cucumber-water',
  '/en/shop/Deserunt dolorem sin',
  '/en/shop/dank-top-5',
  '/en/blog/68e2a5b99a698926bbf4616a',
  '/en/blog/68e2a4079a698926bbf46151',
  '/en/shop/alive-top-5',
  '/en/shop/alive/alive-bubba-kush-1756209032084',
  '/en/shop/dank-green-apple-jack',
  '/en/shop/dank-biscotti',
  '/en/shop/classic-forbidden-fruit',
  '/en/shop/dank-sinmint',
  '/en/shop/classic-top-5',
  '/en/blog/top-5-aromatic-profiles',
  '/en/other/faq',
  '/en/shop/classic blackberry bbq',
  '/en/shop/alive white walker',
  '/en/products/68764f988e986f5b7e86ed18',
  '/en/products/687758078e986f5b7e86fab4',
  '/en/products/68769c858e986f5b7e86f3b7',
  '/en/products/68773a008e986f5b7e86f6c3',
  '/en/products/68773e3d8e986f5b7e86f7d1',
  '/en/products/68767fc88e986f5b7e86ee55',
  '/en/products/68773ad28e986f5b7e86f6fd',
  '/en/products/68723c208e986f5b7e86e07d',
  '/en/products/687691098e986f5b7e86f245',
  '/en/products/687524d38e986f5b7e86e929',
  '/en/products/68775c9c8e986f5b7e86fbfa',
  '/en/shop/alive-oreoz',
  '/en/shop/dank blackberry',
  '/en/shop/alive-biscotti',
  '/en/products/679bb665401881525269cae5',
  '/en/products/6876825c8e986f5b7e86efa7',
  '/en/products/679e53272d8751f02316b00b',
  '/en/shop/alive/alive-white-walker',
  '/en/products/6876945f8e986f5b7e86f310',
  '/en/shop/alive-bubba-kush-1756209032084',
  '/en/shop/sweet cherry diesel',
  '/en/shop/alive-pine-walker-1756211568560',
  '/en/shop/dank-platinum-kush',
  '/en/shop/alive-early-nueve',
  '/en/shop/dank true og',
  '/en/blog/Omnis minus earum om',
  '/en/products/679bafd2401881525269c9ca',
  '/en/shop/alive-jack-here',
  '/en/shop/alive-grape-soda',
  '/en/shop/classic-blackberry-kush',
  '/en/shop/alive-lifter-1756211309503',
  '/en/shop/dank-green-crack',
  '/en/shop/alive-gatsby-1756210750936',
  '/en/shop/alive-white-walker-og',
  '/en/shop/alive-mac-1',
  '/en/shop/alive-gmo-cookies',
  '/en/shop/classic-green-apple-jack',
  '/en/shop/alive/alive-purple',
  '/en/shop/alive-purple-punch',
  '/en/shop/alive-garlicane',
  '/en/shop/classic bubble gum',
  '/en/products/687234f28e986f5b7e86df62',
  '/en/shop/Active',
  '/en/shop/dank/dank-cucumber-1752681891556',
  '/en/my-account',
  '/en/shop/dank blueberry og',
  '/en/auth/login',
  '/en/shop/alive-top-5-1752583525838',
  '/en/products/category/loud-spectrum-sample-packs',
  '/en/other/contact-us',
  '/en/products/68728a6f8e986f5b7e86e3d4',
  '/en/products/6872368d8e986f5b7e86df99',
  '/en/shop/classic agent orange',
  '/en/products/679ba9c0401881525269c8ed',
  '/en/shop/dank chocolate milk',
  '/en/products/category/dank',
  '/en/other/about-us',
  '/en/shop/alive-la-confidential',
  '/en/products/687287898e986f5b7e86e3a5',
  '/en/shop/Hybrid',
  '/en/products/68732ff38e986f5b7e86e55f',
  '/en/products/6877540a8e986f5b7e86f9a2',
  '/en/shop/dank pineapple express',
  '/en/shop/sweet blueberry muffin',
  '/en/shop/alive-mac-1-flower',
  '/en/shop/alive-gsc',
  '/en/auth/register',
  '/en/products/679e524d2d8751f02316afd6',
  '/en/shop/classic-trainwreck',
  '/en/products/68764f098e986f5b7e86ecfb',
  '/en/products/68768c768e986f5b7e86f0cd',
  '/en/products/687690248e986f5b7e86f20d',
  '/en/products/68775bbb8e986f5b7e86fbc3',
  '/en/shop/sweet guava iced',
  '/en/shop/classic ak 47',
  '/en/products/68775ae38e986f5b7e86fb8a',
  '/en/products/68751cb58e986f5b7e86e853',
  '/en/products/687518ed8e986f5b7e86e819',
  '/en/products/category/medical-terpenes',
  '/en/products/category/sauce-terps',
  // Previously added URLs
  '/es/shop/dank-blackberry',
  '/de/shop/classic-rum-cola',
  '/ru/shop/dank-platinum-kush',
  '/de/shop/alive-white-walker',
  '/fr/shop/sweet/sweet-watermelon',
  '/es/shop/dank-chocolate-milk-cookies',
  '/ru/shop/alive-white-walker',
  '/en/shop/sweet/sweet-watermelon',
  '/ja/shop/classic/classic-berry-bliss',
];

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

  // Check if the URL is in the removed URLs list
  if (removedUrls.includes(pathname)) {
    console.log('Access denied: URL is in removed URLs list:', pathname);
    // Extract locale from pathname (format: /{locale}/...)
    const localeMatch = pathname.match(/^\/([a-z]{2}(-[A-Z]{2})?)/);
    const locale = localeMatch ? localeMatch[1] : 'en';
    // Rewrite to not-found page to show 404 without changing the URL
    const notFoundUrl = new URL(`/${locale}/not-found`, request.url);
    return NextResponse.rewrite(notFoundUrl);
  }
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

    // Special handling for wholesale store route - only block inactive wholesalers from this route
    if (pathnameWithoutLocale.startsWith('/wholesale-store')) {
      try {
        // Decode the JWT token to get user info
        const tokenPayload = JSON.parse(atob(authToken.split('.')[1]));

        // If user is not a wholesaler, redirect to registration
        if (tokenPayload.role !== 'wholesaler') {
          console.log('Access denied: User is not a wholesaler');
          return NextResponse.redirect(new URL('/wholesale-registration', request.url));
        }

        // Try to fetch the latest user status from API
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
          const statusResponse = await fetch(`${apiUrl}/api/get-user-status`, {
            headers: {
              Authorization: authToken,
              'Content-Type': 'application/json',
            },
          });

          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            // If API returns active status, allow access even if JWT says inactive
            if (!statusData.error && statusData.data?.status === 'Active') {
              return response;
            }
          }
        } catch (apiError) {
          // If API call fails, fall back to JWT status check
          console.log('API call failed, falling back to JWT status');
        }

        // Fall back to JWT status if API doesn't show Active
        if (tokenPayload.status !== 'Active') {
          console.log('Access denied: User status is not Active');
          return NextResponse.redirect(new URL('/wholesale-registration', request.url));
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
      try {
        const tokenPayload = JSON.parse(atob(authToken.split('.')[1]));

        // Allow inactive wholesalers to access wholesale-registration
        if (
          pathnameWithoutLocale.startsWith('/wholesale-registration') &&
          tokenPayload.role === 'wholesaler' &&
          tokenPayload.status !== 'Active'
        ) {
          return response;
        }

        // For other auth routes, redirect active users to home
        console.log('Redirecting logged-in user from auth route:', pathname);
        return NextResponse.redirect(new URL('/', request.url));
      } catch (error) {
        console.error('Error decoding auth token:', error);
        // If token is invalid, allow access to auth routes
        return response;
      }
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
