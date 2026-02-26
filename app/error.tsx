"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error capture:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 text-white text-center">
            <div className="glass-panel p-8 max-w-lg w-full">
                <h2 className="text-3xl font-heading font-bold text-red-500 mb-4">Algo deu errado!</h2>
                <p className="text-white/70 mb-6 text-sm">
                    Um erro inesperado aconteceu no lado do cliente. Detalhes: {error.message || "Erro desconhecido"}.
                </p>
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors font-bold text-sm w-full"
                >
                    Tentar novamente
                </button>
            </div>
        </div>
    );
}
