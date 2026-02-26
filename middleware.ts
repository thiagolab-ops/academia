import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    // Pega o token da sessão usando o secret configurado
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });

    // Se não tem token e a rota é protegida, manda pro login
    if (!token) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// O matcher garante que o middleware SÓ rode no dashboard e não quebre rotas públicas
export const config = {
    matcher: ["/dashboard/:path*"]
};
