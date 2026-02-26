"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Activity, Dumbbell, Trophy, User, LogOut, Flame, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import confetti from 'canvas-confetti';

const data = [
  { name: 'Jan', weight: 82 },
  { name: 'Fev', weight: 81.5 },
  { name: 'Mar', weight: 80 },
  { name: 'Abr', weight: 79.2 },
  { name: 'Mai', weight: 78.5 },
  { name: 'Jun', weight: 77.8 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("treino");
  const [workoutProgress, setWorkoutProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCompleteExercise = () => {
    setWorkoutProgress(prev => {
      const next = Math.min(prev + 25, 100);
      if (next === 100) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00ff9d', '#00f0ff', '#a855f7']
        });
      }
      return next;
    });
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-y-0 border-l-0 rounded-none hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 text-xl font-heading font-bold">
          <Activity className="text-brand-emerald" />
          <span className="text-gradient">FitPower</span>
        </div>

        <div className="px-4 py-6 flex-1 space-y-2">
          {[
            { id: "treino", icon: Dumbbell, label: "Meu Treino" },
            { id: "progresso", icon: Activity, label: "Progresso" },
            { id: "conquistas", icon: Trophy, label: "Conquistas" },
            { id: "perfil", icon: User, label: "Perfil" }
          ]?.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-brand-emerald/10 text-brand-emerald neon-glow' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
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
            <h1 className="text-3xl font-heading font-bold mb-1">Olá, Atleta! <span className="text-brand-emerald">⚡</span></h1>
            <p className="text-white/50 text-sm">Pronto para superar seus limites hoje?</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-emerald/30">
              <Flame className="w-4 h-4 text-brand-emerald" />
              <span className="text-sm font-bold text-brand-emerald">12 Dias de Ofensiva</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-emerald to-brand-cyan p-[2px]">
              <div className="w-full h-full rounded-full bg-black overflow-hidden border-2 border-black">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {activeTab === "treino" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="glass-panel p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-brand-emerald transition-all duration-1000 ease-out" style={{ width: `${workoutProgress}%` }}></div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Treino A - Peito e Tríceps</h2>
                <span className="text-brand-emerald font-bold">{workoutProgress}% Concluído</span>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Supino Reto", sets: "4x10", weight: "60kg" },
                  { name: "Crucifixo Inclinado", sets: "3x12", weight: "20kg" },
                  { name: "Tríceps Pulley", sets: "4x12", weight: "45kg" },
                  { name: "Tríceps Testa", sets: "3x10", weight: "30kg" }
                ]?.map((exercise, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <div>
                      <h3 className="font-bold text-lg">{exercise.name}</h3>
                      <p className="text-sm text-white/50">{exercise.sets} • {exercise.weight}</p>
                    </div>
                    <button
                      onClick={handleCompleteExercise}
                      className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/20 hover:border-brand-emerald hover:bg-brand-emerald/20 transition-all group-active:scale-95"
                    >
                      <CheckCircle2 className="w-5 h-5 text-transparent group-hover:text-brand-emerald" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "progresso" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Peso Atual", value: "77.8 kg", diff: "-4.2 kg" },
                { label: "Massa Magra", value: "42.1 kg", diff: "+1.5 kg" },
                { label: "Gordura Corporal", value: "14%", diff: "-3%" }
              ]?.map((stat, i) => (
                <div key={i} className="glass-panel p-6">
                  <p className="text-white/50 text-sm mb-2">{stat.label}</p>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-black">{stat.value}</span>
                    <span className="text-brand-emerald text-sm font-bold mb-1">{stat.diff}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-6 h-[400px]">
              <h3 className="text-xl font-bold mb-6">Evolução de Peso</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#00ff9d' }}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#00ff9d" strokeWidth={3} dot={{ r: 6, fill: '#050505', stroke: '#00ff9d', strokeWidth: 2 }} activeDot={{ r: 8, fill: '#00ff9d' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeTab === "conquistas" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Primeiro Passo", desc: "Completou o primeiro treino", icon: "🔥", unlocked: true },
              { title: "Consistência", desc: "10 treinos seguidos", icon: "⚡", unlocked: true },
              { title: "Força Bruta", desc: "Levantou 100kg no supino", icon: "🦍", unlocked: false },
              { title: "Maratonista", desc: "Correu 10km", icon: "🏃", unlocked: false },
            ]?.map((badge, i) => (
              <div key={i} className={`glass-panel p-6 text-center relative overflow-hidden ${badge.unlocked ? 'border-brand-emerald/30' : 'opacity-50 grayscale'}`}>
                {badge.unlocked && <div className="absolute inset-0 bg-brand-emerald/5"></div>}
                <div className="text-5xl mb-4 relative z-10">{badge.icon}</div>
                <h3 className="font-bold mb-2 relative z-10">{badge.title}</h3>
                <p className="text-xs text-white/50 relative z-10">{badge.desc}</p>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
