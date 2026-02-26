import Link from "next/link";
import { Check } from "lucide-react";
import BackButton from "@/src/components/ui/BackButton";

export default function PlanosPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <BackButton />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Escolha seu <span className="text-gradient">Plano</span>
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Treine na melhor estrutura de São Paulo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Silver Plan */}
          <div className="glass-panel p-8 relative flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-4">Silver</h3>
            <div className="text-4xl font-extrabold text-brand-cyan mb-6">
              R$ 129<span className="text-lg text-gray-400 font-normal">/mês</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Acesso área de musculação', 'Aulas coletivas básicas', 'App de treinos', 'Suporte online'].map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-emerald mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors">
              Assinar Silver
            </button>
          </div>

          {/* Ouro Plan */}
          <div className="glass-panel p-8 relative flex flex-col border-brand-emerald/50 shadow-[0_0_30px_rgba(0,255,157,0.1)]">
            <div className="absolute top-0 right-8 transform -translate-y-1/2">
              <span className="bg-brand-emerald text-black text-sm font-bold px-3 py-1 rounded-full">
                Mais Popular
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Ouro</h3>
            <div className="text-4xl font-extrabold text-brand-emerald mb-6">
              R$ 199<span className="text-lg text-gray-400 font-normal">/mês</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Tudo do plano Silver', 'Acesso VIP', 'Avaliação física mensal', 'Aulas de Crossfit e Lutas', 'Nutricionista inclusa'].map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-brand-emerald mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl bg-brand-emerald text-black font-bold hover:bg-opacity-90 transition-colors shadow-[0_0_20px_rgba(0,255,157,0.3)]">
              Assinar Ouro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
