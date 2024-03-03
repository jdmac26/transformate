import NextAuth, { Session } from "next-auth";
import authConfig from "@/auth.config";
import User from "./lib/database/models/user.model";
import { getUserById } from "./lib/actions/user.actions";
import { getAccountByUserId } from "./lib/actions/account.action";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import type { Adapter } from "@auth/core/adapters"
import clientPromise from "./lib/database/mongodb";
import { connectToDatabase } from "./lib/database/mongoose";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up"
  },
  events: {
    async linkAccount({ user }) {
      
        await connectToDatabase();
        await User.updateOne(
          {_id: user.id},
          { emailVerified: new Date() },
          { new: true }
        );
    }
  },
  callbacks: {
    async signIn({ user, account }) {

      console.log({user, account});

      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session } : { token?: any; session: Session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(
        existingUser._id
      );
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    }
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'ImaginifyDB'
  }),
  session: { strategy: "jwt" },
  ...authConfig,
});


