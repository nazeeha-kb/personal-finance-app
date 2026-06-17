import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
])

const isGuestRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
])

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth()

    // If logged in and trying to access auth pages
    if (userId && isGuestRoute(req)) {
        return Response.redirect(new URL("/overview", req.url))
    }

    // If not logged in and trying private pages
    if (!userId && !isPublicRoute(req)) {
        await auth.protect()
    }
})


export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for Clerk's auto-proxy path
        '/__clerk/:path*',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};