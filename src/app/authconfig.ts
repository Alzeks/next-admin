import { NextResponse, NextRequest } from 'next/server'
import type { NextAuthConfig } from 'next-auth';

export const authConfig : NextAuthConfig = {
    providers:[],
    pages: {
      signIn: "/login",
    },
    callbacks: {
      //authorized({ auth, request }) { //variant 2
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        // const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");//2
        const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
        
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false;
        } else if (isLoggedIn) {
          // return Response.redirect(new URL("/dashboard", request.nextUrl));//2
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      },
    },
  } 
