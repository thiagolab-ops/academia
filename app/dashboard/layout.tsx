"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Dumbbell, CreditCard, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const links = [
        { name: "Visão Geral", href: "/dashboard", icon: LayoutDashboard },
        { name: "Alunos", href: "/dashboard/alunos", icon: Users },
        { name: "Treinos", href: "/dashboard/treinos", icon: Dumbbell },
        { name: "Financeiro", href: "/dashboard/financeiro", icon: CreditCard },
    ];

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 glass-panel !rounded-none flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-extrabold text-white">
                        Fit<span className="text-brand-emerald">Power</span>
                        <span className="block text-xs font-normal text-gray-400 mt-1">Admin Panel</span>
                    </h2>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? "bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20 shadow-[0_0_15px_rgba(0,255,157,0.1)]"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-brand-emerald" : ""}`} />
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
