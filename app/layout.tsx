import "./globals.css";

export const metadata = {
    title: "FitPower",
    description: "FitPower Academia",
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
