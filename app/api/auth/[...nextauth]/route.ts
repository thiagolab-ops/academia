import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/src/lib/prisma"; // Ajustado para o path real src/lib/prisma
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) return null;

                const isMatch = await bcrypt.compare(credentials.password, user.password);
                if (!isMatch) return null;

                return { id: user.id, name: user.name, email: user.email, role: user.role };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = (user as any).role;
            return token;
        },
        async session({ session, token }) {
            if (session.user) (session.user as any).role = token.role;
            return session;
        }
    },
    pages: { signIn: "/login" },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
