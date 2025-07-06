import { auth } from "./lib/auth";
import { API_AUTH_PREFIX, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES } from "./routes";

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;

  const { nextUrl } = req;

  // Check if it's an API authentication route
  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);

  // Check if it's a public route
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // Check if it's an auth route
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
