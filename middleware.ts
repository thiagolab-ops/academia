import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const path = req.nextUrl.pathname;

    // Proteção da área do Admin
    if (path.startsWith("/admin/dashboard")) {
        if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));
        if (token.role !== "ADMIN") return NextResponse.redirect(new URL("/dashboard", req.url)); // Se for aluno tentando acessar admin
    }

    // Proteção da área do Aluno
    if (path.startsWith("/dashboard")) {
        if (!token) return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/dashboard/:path*"]
};
