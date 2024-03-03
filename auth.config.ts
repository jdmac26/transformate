import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import EmailProvider from "next-auth/providers/nodemailer";

export default {
    providers: [
        EmailProvider({
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: 587,
            auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        },
        from: process.env.EMAIL_FROM,
        maxAge: 300, // 5 minutes
        }) ,
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
} satisfies NextAuthConfig




