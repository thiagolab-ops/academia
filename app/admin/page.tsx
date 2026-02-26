"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, LayoutDashboard, DollarSign, Settings, LogOut, Search, Plus, MoreVertical } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Fev', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Abr', revenue: 2780 },
  { name: 'Mai', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-y-0 border-l-0 rounded-none hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 text-xl font-heading font-bold">
          <Settings className="text-brand-violet" />
          <span className="text-gradient">FitPower Admin</span>
        </div>

        <div className="px-4 py-6 flex-1 space-y-2">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Visão Geral" },
            { id: "membros", icon: Users, label: "Membros" },
            { id: "financeiro", icon: DollarSign, label: "Financeiro" },
            { id: "config", icon: Settings, label: "Configurações" }
          ]?.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-brand-violet/10 text-brand-violet neon-glow' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 mt-auto">
          <Link href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-500 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-1">Painel Administrativo</h1>
            <p className="text-white/50 text-sm">Gerencie sua academia com inteligência.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Buscar membro..."
                className="pl-10 pr-4 py-2 rounded-full glass-panel border-white/10 bg-white/5 text-sm focus:outline-none focus:border-brand-violet/50 transition-colors"
              />
            </div>
            <button className="w-10 h-10 rounded-full bg-brand-violet text-white flex items-center justify-center hover:bg-brand-violet/80 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </header>

        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Membros Ativos", value: "1,245", diff: "+12%", color: "text-brand-emerald" },
                { label: "Receita Mensal", value: "R$ 145k", diff: "+8%", color: "text-brand-cyan" },
                { label: "Novos Cadastros", value: "84", diff: "+24%", color: "text-brand-violet" },
                { label: "Taxa de Retenção", value: "92%", diff: "-1%", color: "text-red-500" }
              ]?.map((stat, i) => (
                <div key={i} className="glass-panel p-6">
                  <p className="text-white/50 text-sm mb-2">{stat.label}</p>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-black">{stat.value}</span>
                    <span className={`${stat.color} text-sm font-bold mb-1`}>{stat.diff}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 glass-panel p-6 h-[400px]">
                <h3 className="text-xl font-bold mb-6">Receita Anual</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value / 1000}k`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#a855f7' }}
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    />
                    <Bar dataKey="revenue" fill="#a855f7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-6">Atividade Recente</h3>
                <div className="space-y-4">
                  {[
                    { user: "João Silva", action: "Renovou plano Anual", time: "Há 5 min" },
                    { user: "Maria Oliveira", action: "Novo cadastro Pro", time: "Há 12 min" },
                    { user: "Carlos Souza", action: "Cancelou plano", time: "Há 1 hora" },
                    { user: "Ana Costa", action: "Upgrade para Elite", time: "Há 2 horas" },
                  ]?.map((activity, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-violet to-brand-magenta p-[2px] shrink-0">
                        <div className="w-full h-full rounded-full bg-black"></div>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{activity.user}</p>
                        <p className="text-xs text-white/50">{activity.action}</p>
                      </div>
                      <span className="text-xs text-white/30 ml-auto">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "membros" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-sm">
                  <th className="p-4 font-medium">Nome</th>
                  <th className="p-4 font-medium">Plano</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Último Acesso</th>
                  <th className="p-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Lucas Pereira", email: "lucas@email.com", plan: "Pro", status: "Ativo", lastAccess: "Hoje, 08:30" },
                  { name: "Fernanda Lima", email: "fernanda@email.com", plan: "Elite", status: "Ativo", lastAccess: "Ontem, 18:45" },
                  { name: "Roberto Alves", email: "roberto@email.com", plan: "Starter", status: "Inativo", lastAccess: "Há 5 dias" },
                  { name: "Juliana Santos", email: "juliana@email.com", plan: "Pro", status: "Pendente", lastAccess: "Nunca" },
                ]?.map((member, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div>
                          <p className="font-bold text-sm">{member.name}</p>
                          <p className="text-xs text-white/50">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium">{member.plan}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${member.status === 'Ativo' ? 'bg-brand-emerald/20 text-brand-emerald' :
                        member.status === 'Inativo' ? 'bg-red-500/20 text-red-500' :
                          'bg-yellow-500/20 text-yellow-500'
                        }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-white/50">{member.lastAccess}</td>
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-white/50" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </main>
    </div>
  );
}
