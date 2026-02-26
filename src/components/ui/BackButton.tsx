"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white hover:text-brand-emerald hover:border-brand-emerald/50 transition-all group cursor-pointer"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Voltar</span>
        </button>
    );
}
