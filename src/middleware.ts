import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

// This function can be marked `async` if using `await` inside
export default auth(
  async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
    const pathName = req.nextUrl.pathname
    const isAuth = await auth();
    const isLoginPage = pathName.startsWith("/login")
    const sensetiveRoute = ["/dashboard"]
    const isAccessingSensitiveRoute = sensetiveRoute.some(route => pathName.startsWith(route))

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }

      return NextResponse.next()
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (pathName === "/" && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

  }
)
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
}