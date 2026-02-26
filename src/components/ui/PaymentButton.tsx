"use client";

import { useTransition } from "react";
import { markPaymentAsPaid } from "@/app/actions/finance";
import { Check } from "lucide-react";

export default function PaymentButton({ paymentId, userId, amount }: { paymentId: string, userId: string, amount: number }) {
    const [isPending, startTransition] = useTransition();

    const handlePayment = () => {
        startTransition(() => {
            markPaymentAsPaid(paymentId, userId, amount);
        });
    };

    return (
        <button
            onClick={handlePayment}
            disabled={isPending}
            className="bg-brand-emerald text-black text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-[0_0_10px_rgba(0,255,157,0.2)] flex items-center gap-1 ml-auto"
        >
            <Check className="w-3 h-3" />
            {isPending ? "Processando..." : "Receber no Balcão"}
        </button>
    );
}
