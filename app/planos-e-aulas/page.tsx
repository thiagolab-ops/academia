"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import Tilt from "react-parallax-tilt";

export default function Plans() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const plans = [
    {
      name: "Starter",
      price: isAnnual ? "99" : "129",
      desc: "O essencial para começar sua jornada.",
      features: ["Acesso horário livre", "App FitPower", "Ficha de treino básica"],
      popular: false,
      color: "from-white/10 to-white/5"
    },
    {
      name: "Pro",
      price: isAnnual ? "149" : "189",
      desc: "A experiência completa para resultados reais.",
      features: ["Tudo do Starter", "Aulas coletivas", "Avaliação física mensal", "Acesso a todas as unidades"],
      popular: true,
      color: "from-brand-emerald/20 to-brand-cyan/20"
    },
    {
      name: "Elite",
      price: isAnnual ? "249" : "299",
      desc: "Máxima performance e exclusividade.",
      features: ["Tudo do Pro", "Personal Trainer 2x/semana", "Nutricionista online", "Kit FitPower Exclusivo"],
      popular: false,
      color: "from-brand-violet/20 to-brand-magenta/20"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">
            ESCOLHA SEU <span className="text-gradient">PLANO</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
            Sem taxas ocultas, sem burocracia. Cancele quando quiser.
          </p>

          <div className="inline-flex items-center p-1 rounded-full glass-panel border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${!isAnnual ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${isAnnual ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              Anual <span className="text-brand-emerald ml-1">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <Tilt key={i} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`h-full glass-panel p-8 relative overflow-hidden ${plan.popular ? 'border-brand-emerald/50 neon-glow' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-emerald to-brand-cyan"></div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-20 pointer-events-none`}></div>

                <div className="relative z-10">
                  {plan.popular && (
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald text-xs font-bold mb-4">
                      MAIS ESCOLHIDO
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/50 text-sm mb-6 h-10">{plan.desc}</p>

                  <div className="mb-8">
                    <span className="text-5xl font-black">R${plan.price}</span>
                    <span className="text-white/50">/mês</span>
                  </div>

                  <Link href="/dashboard" className={`block w-full py-4 rounded-xl text-center font-bold text-sm transition-all ${plan.popular ? 'bg-brand-emerald text-black hover:bg-brand-emerald/90' : 'bg-white/10 hover:bg-white/20'}`}>
                    Assinar {plan.name}
                  </Link>

                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-emerald/20 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-brand-emerald" />
                        </div>
                        <span className="text-sm text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
}
