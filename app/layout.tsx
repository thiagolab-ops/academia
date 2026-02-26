import "./globals.css";

export const metadata = {
    title: "FitPower",
    description: "FitPower Academia",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className="antialiased">{children}</body>
        </html>
    );
}
