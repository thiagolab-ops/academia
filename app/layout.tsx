import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FitPower",
    description: "FitPower Academia",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
    },
};

import { Providers } from "./Providers";
import Chatbot from "@/src/components/ui/Chatbot";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className="antialiased" suppressHydrationWarning>
                <Providers>
                    {children}
                </Providers>
                <Chatbot />
            </body>
        </html>
    );
}
