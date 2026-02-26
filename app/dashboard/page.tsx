import { Users, TrendingUp, HandCoins, Activity } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "Total de Alunos", value: "342", icon: Users, change: "+12%" },
    { title: "Receita (Mês)", value: "R$ 48.250", icon: HandCoins, change: "+5%" },
    { title: "Check-ins Hoje", value: "128", icon: Activity, change: "Alto fluxo" },
  ];

  const recentStudents = [
    { id: 1, name: "Lucas Silva", plan: "Ouro", status: "Ativo", joinDate: "Hoje" },
    { id: 2, name: "Mariana Costa", plan: "Silver", status: "Ativo", joinDate: "Ontem" },
    { id: 3, name: "Pedro Mendes", plan: "Ouro", status: "Inativo", joinDate: "3 dias atrás" },
  ];

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

      {/* Tabela de Ultimos Alunos */}
      <div className="glass-panel p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-brand-cyan" />
          Matrículas Recentes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="pb-3 px-4 font-medium">Nome</th>
                <th className="pb-3 px-4 font-medium">Plano</th>
                <th className="pb-3 px-4 font-medium">Status</th>
                <th className="pb-3 px-4 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-transparent">
              {recentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4 text-white font-medium">{student.name}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${student.plan === 'Ouro' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-gray-400/10 text-gray-300'
                      }`}>
                      {student.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${student.status === 'Ativo' ? 'bg-brand-emerald/10 text-brand-emerald' : 'bg-red-500/10 text-red-500'
                      }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">{student.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
