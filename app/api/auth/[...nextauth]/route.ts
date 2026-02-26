import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const { handlers } = NextAuth({
    providers: [Google]
});

export const { GET, POST } = handlers;
