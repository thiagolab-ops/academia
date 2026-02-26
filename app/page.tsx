"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Activity, Zap, Shield } from "lucide-react";
import dynamic from 'next/dynamic';
const Hero3D = dynamic(() => import('../src/components/ui/Hero3D'), { ssr: false });

export default function Landing() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col relative">
      <Hero3D />
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 rounded-none bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-heading font-bold tracking-tighter flex items-center gap-2">
            <Zap className="text-brand-emerald w-6 h-6" />
            <span className="text-gradient">FitPower</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <Link href="/planos-e-aulas" className="hover:text-white transition-colors">Planos</Link>
            <a href="#estrutura" className="hover:text-white transition-colors">Estrutura</a>
            <a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Login</Link>
            <Link href="/planos-e-aulas" className="px-6 py-2.5 rounded-full bg-brand-emerald text-black font-semibold text-sm hover:bg-brand-emerald/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]">
              Começar Agora
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-brand-emerald/30 text-brand-emerald text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
              </span>
              Vagas abertas para 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black leading-[0.9] mb-6">
              REDEFINA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-brand-cyan">SEUS</span> <br />
              LIMITES.
            </h1>
            <p className="text-lg text-white/60 mb-8 max-w-md">
              A experiência fitness mais imersiva e tecnológica. Treinos personalizados, gamificação e resultados reais.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/planos-e-aulas" className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-2 group">
                Agendar Treino Grátis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/planos-e-aulas" className="px-8 py-4 rounded-full glass-panel font-bold text-sm hover:bg-white/10 transition-all">
                Ver Planos
              </Link>
            </div>
          </motion.div>

          {/* 3D/Visual Element Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] w-full hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-emerald/20 to-brand-violet/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
            <div className="absolute inset-10 glass-panel rounded-full border-brand-emerald/20 flex items-center justify-center overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" alt="Atleta" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div id="estrutura" className="max-w-7xl mx-auto mt-32 grid md:grid-cols-3 gap-6 relative z-10">
          {[
            { icon: Activity, title: "Treinos Inteligentes", desc: "IA adaptando sua carga e evolução em tempo real." },
            { icon: Zap, title: "Gamificação", desc: "Ganhe XP, desbloqueie badges e suba no ranking." },
            { icon: Shield, title: "Estrutura Premium", desc: "Equipamentos de última geração e ambiente imersivo." }
          ]?.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 hover:border-brand-emerald/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-brand-emerald/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-brand-emerald" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
