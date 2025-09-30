import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add custom logic here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated for protected routes
        const { pathname } = req.nextUrl
        
        // Public routes that don't need authentication
        const publicRoutes = [
          "/",
          "/auth/signin",
          "/auth/signup",
          "/portfolio", 
          "/resume",
          "/projects",
          "/gallery",
          "/api/auth",
          "/api/analytics"
        ]

        // Guest accessible routes (limited functionality)
        const guestRoutes = [
          "/files", // Limited file access for guests
        ]

        // Check if the current path is public
        const isPublicRoute = publicRoutes.some(route => 
          pathname.startsWith(route)
        )

        // Check if guest access is allowed
        const isGuestRoute = guestRoutes.some(route =>
          pathname.startsWith(route)
        )

        // Allow guest access with query parameter
        const { searchParams } = req.nextUrl
        const isGuestMode = searchParams.get('guest') === 'true'

        // Allow access to public routes
        if (isPublicRoute) {
          return true
        }

        // Allow limited guest access to certain routes
        if (isGuestRoute && isGuestMode) {
          return true
        }

        // Protect dashboard, family, and admin routes - require authentication
        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/family") ||
          pathname.startsWith("/admin")
        ) {
          return !!token
        }

        // Files route: allow guest access with limitations
        if (pathname.startsWith("/files")) {
          return !!token || isGuestMode
        }

        // Default: allow access
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}