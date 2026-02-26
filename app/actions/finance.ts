"use server";

import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

// Marca como pago e já lança o vencimento do próximo mês
export async function markPaymentAsPaid(paymentId: string, userId: string, amount: number) {
    try {
        // 1. Atualiza o pagamento atual para PAID
        const currentPayment = await prisma.payment.update({
            where: { id: paymentId },
            data: { status: "PAID", paidAt: new Date() }
        });

        // 2. Calcula a data do próximo mês
        const nextDueDate = new Date(currentPayment.dueDate);
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);

        // 3. Cria a fatura pendente do próximo mês
        await prisma.payment.create({
            data: {
                userId,
                amount,
                dueDate: nextDueDate,
                status: "PENDING"
            }
        });

        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Erro ao processar pagamento" };
    }
}
