import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const adminExists = await prisma.user.findUnique({
            where: { email: 'admin@fitpower.com' }
        });

        if (adminExists) {
            return NextResponse.json({ message: 'Admin já existe!' });
        }

        const hashedPassword = await bcrypt.hash('fitpower2026', 10);

        await prisma.user.create({
            data: {
                name: 'Admin FitPower',
                email: 'admin@fitpower.com',
                password: hashedPassword,
                role: 'ADMIN',
            }
        });

        return NextResponse.json({
            message: 'Admin criado com sucesso!',
            email: 'admin@fitpower.com',
            senha: 'fitpower2026'
        });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar admin' }, { status: 500 });
    }
}
