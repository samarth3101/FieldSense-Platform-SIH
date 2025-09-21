// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // Check if user is trying to access dashboard
//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     // Check for authentication (you can customize this logic)
//     const token = request.cookies.get('token')?.value || 
//                   request.headers.get('authorization');
    
//     if (!token) {
//       // Redirect to home if not authenticated
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   }
  
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*']
// };
