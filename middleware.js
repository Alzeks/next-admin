import NextAuth from "next-auth";
import { authConfig } from "./app/authconfig";

console.log('99999 middl');
function myNextAuth(myConfig = { collback: { authorized() { return 6 + 8 } } }) {
  const es = 9;
  const authorizedData = myConfig.collback.authorized() + es
  function auth() { return authorizedData }
  return { auth, es, closureEs() { return es } }
}
const o = myNextAuth().auth; console.log(o());//for another component
const { auth, closureEs, es } = myNextAuth()
console.log(auth(), closureEs(), es);

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
