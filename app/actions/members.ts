"use server";

import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function registerNewMember(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const amount = parseFloat(formData.get("amount") as string);
        const dueDateString = formData.get("dueDate") as string;

        if (!name || !email || !amount || !dueDateString) {
            return { success: false, error: "Preencha todos os campos." };
        }

        const dueDate = new Date(dueDateString);

        // Verifica se já existe
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return { success: false, error: "Email já cadastrado." };

        // Senha padrão para novos alunos
        const defaultPassword = "fitpower" + new Date().getFullYear();
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        // Cria o Aluno
        const newMember = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "MEMBER",
                payments: {
                    create: {
                        amount,
                        dueDate,
                        status: "PENDING"
                    }
                }
            }
        });

        revalidatePath("/admin/dashboard");
        return {
            success: true,
            message: `Matrícula concluída! Senha temporária do aluno: ${defaultPassword}`
        };
    } catch (error) {
        return { success: false, error: "Erro crítico ao matricular aluno." };
    }
}
