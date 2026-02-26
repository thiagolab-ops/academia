"use client";

import { useState, useTransition } from "react";
import { registerNewMember } from "@/app/actions/members";
import { UserPlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function NewMemberForm() {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResult(null);
        const formData = new FormData(e.currentTarget);

        startTransition(() => {
            registerNewMember(formData).then((res) => {
                setResult(res);
                if (res.success) {
                    (e.target as HTMLFormElement).reset();
                }
            });
        });
    };

    return (
        <div className="glass-panel p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/5 rounded-bl-[100px] z-0 pointer-events-none" />

            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                <UserPlus className="w-5 h-5 text-brand-emerald" />
                Nova Matrícula (Recepção)
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                            placeholder="João da Silva"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">E-mail do Aluno</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                            placeholder="joao@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Valor do Plano (R$)</label>
                        <input
                            type="number"
                            name="amount"
                            step="0.01"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors"
                            placeholder="199.00"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Vencimento da 1ª Fatura</label>
                        <input
                            type="date"
                            name="dueDate"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-gray-300 focus:outline-none focus:border-brand-emerald focus:ring-1 focus:ring-brand-emerald transition-colors [color-scheme:dark]"
                        />
                    </div>
                </div>

                {result?.success && (
                    <div className="bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald p-3 rounded-xl flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>{result.message}</span>
                    </div>
                )}

                {result?.error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl flex items-center gap-2 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{result.error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-brand-emerald text-black font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-[0_0_15px_rgba(0,255,157,0.2)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Matriculando e Gerando Fatura...
                        </>
                    ) : (
                        "Matricular Aluno"
                    )}
                </button>
            </form>
        </div>
    );
}
