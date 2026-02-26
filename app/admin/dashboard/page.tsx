import { Users, TrendingUp, HandCoins, Activity, AlertCircle } from "lucide-react";
import prisma from "@/src/lib/prisma";
import PaymentButton from "@/src/components/ui/PaymentButton";
import NewMemberForm from "@/src/components/admin/NewMemberForm";

export default async function DashboardPage() {
  const stats = [
    { title: "Total de Alunos", value: "342", icon: Users, change: "+12%" },
    { title: "Receita (Mês)", value: "R$ 48.250", icon: HandCoins, change: "+5%" },
    { title: "Check-ins Hoje", value: "128", icon: Activity, change: "Alto fluxo" },
  ];

  // Buscando os pagamentos pendentes e pagos da base
  const payments = await prisma.payment.findMany({
    include: {
      user: true,
    },
    orderBy: {
      dueDate: 'asc'
    },
    take: 10 // Limite para o dashboard
  });

  const now = new Date();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Visão Geral</h1>
        <p className="text-gray-400">Bem-vindo de volta ao painel administrativo.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-6 flex flex-col relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 text-white/5 group-hover:text-brand-emerald/5 transition-colors transform group-hover:scale-110 duration-500">
                <Icon className="w-32 h-32" />
              </div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-brand-emerald/10 text-brand-emerald rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-brand-emerald bg-brand-emerald/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-extrabold text-white">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Matrícula (Ocupa 1/3 da tela) */}
        <div className="lg:col-span-1">
          <NewMemberForm />
        </div>

        {/* Tabela de Inadimplência / Módulo Financeiro de Balcão (Ocupa 2/3 da tela) */}
        <div className="glass-panel p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-brand-cyan" />
            Financeiro de Balcão
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="pb-3 px-4 font-medium">Nome do Aluno</th>
                  <th className="pb-3 px-4 font-medium">Valor</th>
                  <th className="pb-3 px-4 font-medium">Vencimento</th>
                  <th className="pb-3 px-4 font-medium">Status</th>
                  <th className="pb-3 px-4 font-medium text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-transparent">
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400 border-none">
                      Nenhum lançamento no sistema.
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => {
                    const isLate = payment.status === "PENDING" && new Date(payment.dueDate) < now;
                    const isPending = payment.status === "PENDING" && new Date(payment.dueDate) >= now;
                    const isPaid = payment.status === "PAID";

                    return (
                      <tr key={payment.id} className="hover:bg-white/5 transition-colors group">
                        <td className="py-4 px-4 text-white font-medium">{payment.user.name || payment.user.email}</td>
                        <td className="py-4 px-4 font-mono text-gray-300">R$ {payment.amount.toFixed(2)}</td>
                        <td className="py-4 px-4 text-gray-400 text-sm">
                          {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-4 px-4">
                          {isPaid && (
                            <span className="px-2 py-1 text-xs rounded-full font-medium bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
                              Em Dia
                            </span>
                          )}
                          {isLate && (
                            <span className="px-2 py-1 text-xs rounded-full font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                              Inadimplente
                            </span>
                          )}
                          {isPending && (
                            <span className="px-2 py-1 text-xs rounded-full font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                              Pendente (No Prazo)
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          {(isLate || isPending) ? (
                            <PaymentButton paymentId={payment.id} userId={payment.userId} amount={payment.amount} />
                          ) : (
                            <span className="text-gray-500 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
