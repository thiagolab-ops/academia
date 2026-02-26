"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Zap, Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Credenciais inválidas. Tente novamente.");
                setIsLoading(false);
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError("Ocorreu um erro ao conectar. Tente novamente mais tarde.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-emerald/10 rounded-full blur-[100px] opacity-50 mix-blend-screen pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10 text-white">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <Zap className="w-10 h-10 text-brand-emerald" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        Fit<span className="text-brand-emerald">Power</span> Admin
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Acesse o painel para gerenciar a academia
                    </p>
                </div>

                <div className="glass-panel p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                E-mail
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                                    placeholder="admin@fitpower.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-brand-emerald text-black font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Conectando...
                                </>
                            ) : (
                                "Entrar no Dashboard"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
