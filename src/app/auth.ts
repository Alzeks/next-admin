import NextAuth, { DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";
//import bcrypt from "bcrypt";
import { userType, UserT } from "./types";

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    username?: string, image?: string
  }
}
declare module "next-auth" {
  interface User {
    username?: string, img: string
  }
}
declare module "next-auth" {
  /*** Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context*/
  interface Session {
    user: {
      username?: string, image: string
    } & DefaultSession["user"]
  }
}

const login = async (credentials: { username: string, password: string }) => {
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });
    //For bcrypt----------------------------------
    //if (!user || !user.isAdmin) throw new Error("Wrong credentials!");
    // const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    //if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    //--------------------------------------------
    return user
  } catch (err) {
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth, handlers: { GET, POST } } =
  NextAuth({
    ...authConfig,
    providers: [
      CredentialsProvider({
        async authorize(credentials: { username: string, password: string }): Promise<null> {
          try {
            const user = await login(credentials)

            return user

          } catch (err) { return null; }
        },
      }),
    ],
    secret: process.env.AUTH_SECRET,
    // ADD ADDITIONAL INFORMATION TO SESSION
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          return { ...token, username: user.username, image: user.img }
        }
        return token;
      },
      //@ts-ignore
      async session({ session, token }) {
        if (token) {
          return { ...session, user: { image: token.image, username: token.username } }
        }
        return session;
      },
    },
  });