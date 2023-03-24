import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Redis: In Memory Database for rate limiting
const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_SECRET,
})

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(50, '1 h')
})

export default withAuth(
    async function middleware(req) {
        const pathname = req.nextUrl.pathname // Relative path
        // Manage rate limiting for API calls
        if(pathname.startsWith('/api')) {
            const ip = req.ip ?? '127.0.0.1'
            try {
                // Rate Limit the IP making the request
                const { success } = await ratelimit.limit(ip)
                // If too many requests, throw error
                if(!success) return NextResponse.json({error: 'Too many requests'})
                // Otherwise
                return NextResponse.next()
            } catch (error){
                return NextResponse.json({error: 'Internal Server Error'})
            }
        }

        // Manage route protection
        const token = await getToken({ req })
        // Check if user is authorised
        const isAuth = !!token
        // Check if the page is the login page
        const isAuthPage = req.nextUrl.pathname.startsWith('/login')
        // Declare sensitive routes
        const sensitiveRoutes = ['/dashboard']
        // If trying to access auth page when already authorised
        if(isAuthPage) {
            if(isAuth) {
                // Then redirect to the dashboard
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }
            // Otherwise pass on the request
            return null
        }
        // If user is not authenticated and trying to access a sensitive route
        if(!isAuth && sensitiveRoutes.some((route) => pathname.startsWith(route))) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    },
    {
        callbacks: {
            // Workaround for handling redirect on auth pages
            // Returns true so that middleware function is always called
            async authorized() {
                return true
            },
        },
    }
)
// Export config to determine when middleware should run
export const config = {
    matcher: ['/', '/login', '/dashboard/:path*', '/api/:path*'],
}