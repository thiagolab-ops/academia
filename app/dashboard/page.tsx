import { CheckCircle, Trophy, Activity, Flame, Medal, AlertTriangle } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/src/lib/prisma";

export default async function MemberDashboardPage() {
    const session = await getServerSession(authOptions);

    let isLate = false;
    if (session?.user?.email) {
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (user) {
            const latePayment = await prisma.payment.findFirst({
                where: {
                    userId: user.id,
                    status: "PENDING",
                    dueDate: { lt: new Date() }
                }
            });
            if (latePayment) isLate = true;
        }
    }

    const checkIns = [
        { id: 1, class: "Jiu-Jitsu Adultos - Iniciante", date: "Hoje, 19:00", instructor: "Prof. Marcos" },
        { id: 2, class: "Crossfit - WOD", date: "25 Fev, 18:30", instructor: "Prof. Sarah" },
    ];

    const progress = [
        { type: "Faixa", value: "Azul - 2 Graus", date: "10 Jan 2026", color: "text-blue-500" },
        { type: "Peso", value: "78.5kg (-2kg)", date: "15 Fev 2026", color: "text-brand-emerald" },
    ];

    return (
        <div className="space-y-8 p-8 max-w-7xl mx-auto min-h-screen">
            {isLate && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start gap-4 shadow-[0_0_20px_rgba(239,68,68,0.15)] relative overflow-hidden mb-8">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full pointer-events-none" />
                    <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-red-500 font-bold mb-1">Acesso Temporariamente Suspenso</h3>
                        <p className="text-red-400 text-sm">
                            Sua mensalidade consta como vencida em nosso sistema. Por favor, regularize o pagamento diretamente na recepção da academia para não perder o acesso às aulas e manter o seu XP.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Seu Treino</h1>
                    <p className="text-gray-400">Acompanhe seu progresso e agenda da academia.</p>
                </div>
                <div className="glass-panel px-6 py-3 flex items-center gap-4 hidden sm:flex border-brand-emerald/30">
                    <Trophy className="w-8 h-8 text-brand-emerald" />
                    <div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Level 12</div>
                        <div className="text-xl text-white font-black">2.450 XP</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Check-ins App */}
                <section className="glass-panel p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-bl-[100px] z-0 pointer-events-none" />
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                        <CheckCircle className="w-5 h-5 text-brand-cyan" />
                        Meus Hard Check-ins
                    </h2>
                    <div className="space-y-4 relative z-10">
                        {checkIns.map((check) => (
                            <div key={check.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center hover:bg-white/10 transition-colors cursor-pointer">
                                <div>
                                    <h4 className="text-white font-medium">{check.class}</h4>
                                    <p className="text-sm text-gray-400 mt-1">{check.instructor}</p>
                                </div>
                                <div className="text-brand-cyan text-sm font-bold bg-brand-cyan/10 px-3 py-1 rounded-full">
                                    {check.date}
                                </div>
                            </div>
                        ))}
                        <button className="w-full mt-4 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors border border-dashed border-white/20">
                            Ver Histórico Completo
                        </button>
                    </div>
                </section>

                {/* Progresso Genérico / SaaS */}
                <section className="glass-panel p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-brand-emerald/5 rounded-br-[100px] z-0 pointer-events-none" />
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                        <Activity className="w-5 h-5 text-brand-emerald" />
                        Meu Progresso
                    </h2>
                    <div className="space-y-4 relative z-10">
                        {progress.map((prog, idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 border-b border-white/5 last:border-0 border-dashed">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/5 p-2 rounded-lg">
                                        {prog.type === 'Faixa' ? <Medal className={`w-5 h-5 ${prog.color}`} /> : <Flame className={`w-5 h-5 ${prog.color}`} />}
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm">{prog.type}</div>
                                        <div className="text-white font-bold">{prog.value}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">{prog.date}</div>
                            </div>
                        ))}
                        <button className="w-full mt-4 py-3 bg-brand-emerald text-black font-bold rounded-xl hover:bg-opacity-90 transition-colors shadow-[0_0_15px_rgba(0,255,157,0.2)]">
                            Registrar Evolução
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
