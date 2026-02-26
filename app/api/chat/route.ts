import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: 'Você é a assistente virtual da FitPower, uma academia futurista de alto padrão em São Paulo. Seu objetivo é tirar dúvidas e ser persuasiva para converter visitantes em alunos. Responda de forma curta, enérgica e educada. Os planos são: Ouro (R$199) e Silver (R$129).'
                    },
                    ...messages
                ]
            })
        });

        const data = await response.json();
        return NextResponse.json(data.choices[0].message);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao conectar com a IA' }, { status: 500 });
    }
}
